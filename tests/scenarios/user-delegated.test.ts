import { expect, it } from 'vitest'
import { send, user } from './helpers'

it('uses the model once to delegate a paraphrased request and returns the API result', async () => {
  const result = await send('Дай мои данные пользователя')
  expect.soft(result.modelCalls).toBe(1)
  expect.soft(result.graphqlCalls).toBe(1)
  expect.soft(result.toolResultsSentToModel).toBe(0)
  expect(JSON.parse(result.content)).toEqual({ data: { me: user } })
})
