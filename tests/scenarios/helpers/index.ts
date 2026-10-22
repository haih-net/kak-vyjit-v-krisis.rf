import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { createServer, type Server } from 'node:http'
import express, { type Express } from 'express'
import { afterAll, beforeAll, expect } from 'vitest'
import { db } from 'server/database'
import { schema } from 'server/schema'
import type { UserRecord } from 'server/schema/types/User/interfaces'
import { setupChat } from 'server/chat'
import { createContext } from 'server/context'
import { createToken } from 'server/schema/types/User/helpers/auth'
import { chatStorage } from 'server/chat/storage'
import type { AgentResult } from 'server/chat/agent/types'
import type { ProviderMessage } from 'server/chat/types'

const { graphql } = createRequire(import.meta.url)(
  'graphql',
) as typeof import('graphql')

export const user: Pick<UserRecord, 'id' | 'username' | 'email' | 'fullname'> =
  {
    id: randomUUID(),
    username: `scenario-${randomUUID()}`,
    email: `scenario-${randomUUID()}@example.test`,
    fullname: 'Scenario User',
  }
let server: Server | undefined
let endpoint: string
let apiCalls = 0
let authToken: string

interface ExecutionRecord {
  kind?: string
  function: {
    name: string
    arguments: { messages?: ProviderMessage[] }
  }
}

beforeAll(async () => {
  for (const name of ['CHAT_API_BASE_URL', 'CHAT_API_KEY', 'CHAT_MODEL']) {
    if (!process.env[name]?.trim()) {
      throw new Error(`${name} is required for live scenario tests`)
    }
  }
  expect(process.env.DATABASE_FILENAME).toBe(':memory:')
  const [record] = await db<UserRecord>('User')
    .insert({ ...user, status: 'active' })
    .returning('*')
  authToken = await createToken(record, db)
  const app: Express = express()
  // This isolated API represents the authenticated user's execution context.
  // It uses the production schema and database, not a replacement me resolver.
  app.post('/api', express.json(), async (req, res) => {
    apiCalls += 1
    const result = await graphql({
      schema,
      source: req.body.query,
      variableValues: req.body.variables,
      operationName: req.body.operationName,
      contextValue: await createContext(req),
    })
    res.json(result)
  })
  setupChat({ app, storage: chatStorage })
  const httpServer = createServer(app)
  server = httpServer
  await new Promise<void>((resolve) =>
    httpServer.listen(0, '127.0.0.1', resolve),
  )
  const address = httpServer.address()
  if (!address || typeof address === 'string') {
    throw new Error('Missing scenario API address')
  }
  endpoint = `http://127.0.0.1:${address.port}/api`
})

afterAll(async () => {
  const httpServer = server
  if (httpServer) {
    httpServer.closeAllConnections()
    await new Promise<void>((resolve) => httpServer.close(() => resolve()))
  }
  await db.destroy()
})

export async function send(
  message: string,
  authenticated = true,
): Promise<{
  content: string
  modelCalls: number
  graphqlCalls: number
  toolResultsSentToModel: number
  agentCalls: unknown[]
}> {
  const headers = {
    'Content-Type': 'application/json',
    ...(authenticated ? { Authorization: `Bearer ${authToken}` } : {}),
  }
  const issued = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: 'mutation { createChatToken(data: {}) }' }),
  })
  const issuance = (await issued.json()) as {
    errors?: unknown[]
    data: { createChatToken: string }
  }
  expect(issuance.errors).toBeUndefined()
  const token: string = issuance.data.createChatToken
  const previousApiCalls = apiCalls
  const response = await fetch(`${endpoint}/chat`, {
    method: 'POST',
    headers: { ...headers, 'dialog-token': token },
    body: JSON.stringify({ message, stream: false }),
  })
  expect(response.status).toBe(200)
  const result = (await response.json()) as AgentResult
  expect(result.success).toBe(true)
  // Observe real provider requests without replacing any response.
  const records = (await chatStorage.read(token.split('.')[0]))
    .filter(({ role }) => role === 'tool_call')
    .map(({ content }) => JSON.parse(content) as ExecutionRecord)
    .filter((entry) => entry.kind === 'execution')
  const modelCalls = records.filter((entry) => entry.function.name === 'llm')
  return {
    content: result.content,
    modelCalls: modelCalls.length,
    graphqlCalls: apiCalls - previousApiCalls,
    toolResultsSentToModel: modelCalls.reduce(
      (count, entry) =>
        count +
        (entry.function.arguments.messages?.filter(
          (message) => message.role === 'tool',
        ).length ?? 0),
      0,
    ),
    agentCalls: records.filter((entry) => entry.function.name === 'agent'),
  }
}
