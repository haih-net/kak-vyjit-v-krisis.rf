import { expect, it } from 'vitest'
import { send, user } from './helpers'

it('routes an exact user request to me without calling the model', async () => {
  const result = await send('Покажи мои данные пользователя')
  expect.soft(result.modelCalls).toBe(0)
  expect.soft(result.graphqlCalls).toBe(1)
  expect.soft(result.toolResultsSentToModel).toBe(0)
  expect(JSON.parse(result.content)).toEqual({ data: { me: user } })
})

it('returns no user without Authorization even with a valid dialogue token', async () => {
  const result = await send('Покажи мои данные пользователя', false)
  expect(result.modelCalls).toBe(0)
  expect(result.graphqlCalls).toBe(1)
  expect(JSON.parse(result.content)).toEqual({ data: { me: null } })
})
