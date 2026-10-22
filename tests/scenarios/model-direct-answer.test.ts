import { expect, it } from 'vitest'
import { send } from './helpers'

it('returns a direct model answer without calling the API', async () => {
  const result = await send('Ответь одним словом: Привет')
  expect.soft(result.modelCalls).toBe(1)
  expect.soft(result.graphqlCalls).toBe(0)
  expect.soft(result.toolResultsSentToModel).toBe(0)
  expect(result.content.trim()).toMatch(/^Привет[.!]?$/u)
})
