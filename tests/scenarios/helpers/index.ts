import { callAgentTool } from 'server/chat/tools/callAgent'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { createServer, type Server } from 'node:http'
import express, { type Express } from 'express'
import { afterAll, beforeAll, expect } from 'vitest'
import { db } from 'server/database'
import { schema } from 'server/schema'
import type { UserRecord } from 'server/schema/types/User/interfaces'
import { ChatAgent } from 'server/chat/agent/ChatAgent'
import { createAgentContext } from 'server/chat/agent/context'
import { chatStorage } from 'server/chat/storage'
import { ToolRegistry } from 'server/chat/tools/registry'
import { graphqlRequestTool } from 'server/chat/tools/graphqlRequest'

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

beforeAll(async () => {
  for (const name of ['CHAT_API_BASE_URL', 'CHAT_API_KEY', 'CHAT_MODEL']) {
    if (!process.env[name]?.trim()) {
      throw new Error(`${name} is required for live scenario tests`)
    }
  }
  expect(process.env.DATABASE_FILENAME).toBe(':memory:')
  await db<UserRecord>('User').insert({ ...user, status: 'active' })
  const app: Express = express()
  // This isolated API represents the authenticated user's execution context.
  // It uses the production schema and database, not a replacement me resolver.
  app.post('/api', express.json(), async (req, res) => {
    apiCalls += 1
    const currentUser = await db<UserRecord>('User')
      .where('id', user.id)
      .first()
    const result = await graphql({
      schema,
      source: req.body.query,
      variableValues: req.body.variables,
      operationName: req.body.operationName,
      contextValue: { req, db, currentUser: currentUser ?? null },
    })
    res.json(result)
  })
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

export async function send(message: string): Promise<{
  content: string
  modelCalls: number
  graphqlCalls: number
  toolResultsSentToModel: number
  agentCalls: unknown[]
}> {
  const token = await chatStorage.issue()
  const context = createAgentContext({
    storage: chatStorage,
    endpoint,
    tools: new ToolRegistry([graphqlRequestTool, callAgentTool]),
    config: {
      systemMessage: [
        'You handle requests for an authenticated user.',
        'The available GraphQL API executes in that user context.',
        'To read their profile, query me { id username email fullname }.',
        'The final profile result must be the exact JSON API response: {"data":{"me":{...}}}.',
        'Never invent profile values or wrap JSON in Markdown.',
        'You may delegate to the available function or answer directly when no API data is needed.',
        'When delegating, put any explanation only in the reasoning argument.',
      ].join('\n'),
    },
  })
  const client = context.client
  let modelCalls = 0
  let toolResultsSentToModel = 0
  // Observe real provider requests without replacing any response.
  context.client = {
    endpoint: client.endpoint,
    complete: async (request, signal) => {
      modelCalls += 1
      toolResultsSentToModel += request.messages.filter(
        ({ role }) => role === 'tool',
      ).length
      return client.complete(request, signal)
    },
  }
  const previousApiCalls = apiCalls
  const result = await new ChatAgent().run(message, token, context, {
    stream: false,
  })
  expect(result.success).toBe(true)
  return {
    content: result.content,
    modelCalls,
    graphqlCalls: apiCalls - previousApiCalls,
    toolResultsSentToModel,
    agentCalls: (await chatStorage.read(token.split('.')[0]))
      .filter(({ role }) => role === 'tool_call')
      .map(({ content }) => JSON.parse(content))
      .filter(
        (entry) =>
          entry.kind === 'execution' && entry.function.name === 'agent',
      ),
  }
}
