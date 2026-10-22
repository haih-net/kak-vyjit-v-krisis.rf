import { expect, it } from 'vitest'
import { Execution, DepthLimitError } from './execution'
import { MemoryStorage } from '../testing/MemoryStorage'
import { ChatAgent } from './ChatAgent'
import { createAgentContext } from './context'

it('allows ten nested stages, rejects the eleventh and records the parent chain', async () => {
  const storage = new MemoryStorage()
  const execution = new Execution(
    storage,
    'same-dialogue',
    'request',
    new AbortController().signal,
  )
  const nested = (count: number): Promise<string> =>
    execution.run('step', { count }, async () =>
      count === 1 ? 'done' : nested(count - 1),
    )
  expect(await nested(10)).toBe('done')
  await expect(nested(11)).rejects.toBeInstanceOf(DepthLimitError)
  const records = (await storage.read('same-dialogue')).map(({ content }) =>
    JSON.parse(content),
  )
  expect(records.slice(0, 10).map(({ depth }) => depth)).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ])
  expect(records[9].parentId).toBe(records[8].id)
  expect(records[9].function.arguments).toEqual({ count: 1 })
  expect(records.at(-1)).toMatchObject({
    depth: 11,
    error: 'Maximum execution depth 10 exceeded',
  })
  // Sequential siblings do not consume nesting depth.
  for (let index = 0; index < 12; index += 1) {
    expect(await nested(1)).toBe('done')
  }
})

it('limits recursive agent pipelines before any provider request is needed', async () => {
  const storage = new MemoryStorage()
  let request = 'Покажи мои данные пользователя'
  for (let index = 0; index < 5; index += 1) {
    request = `Вызови call_agent с запросом «${request}»`
  }
  const context = createAgentContext({
    storage,
    config: { apiKey: undefined, model: undefined },
  })
  await expect(
    new ChatAgent().run(request, 'test-token', context),
  ).rejects.toThrow('Maximum execution depth 10 exceeded')
  const history = await storage.read('same-dialogue')
  const records = history
    .filter(({ role }) => role === 'tool_call')
    .map(({ content }) => JSON.parse(content))
    .filter(({ kind }) => kind === 'execution')
  expect(records.some(({ function: call }) => call.name === 'llm')).toBe(false)
  expect(records.at(-1).depth).toBe(11)
  expect(history.filter(({ role }) => role === 'user')).toHaveLength(1)
  expect(history.at(-1)?.success).toBe(false)
})
