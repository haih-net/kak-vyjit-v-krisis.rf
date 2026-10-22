import { expect, it } from 'vitest'
import { send, user } from './helpers'

it('delegates through the real model to an agent whose direct route bypasses the model', async () => {
  const result = await send(
    'Передай через call_agent задачу дословно, без кавычек: «Покажи мои данные пользователя». Верни результат этой задачи.',
  )
  expect(result.modelCalls, JSON.stringify(result.agentCalls)).toBe(1)
  expect(result.graphqlCalls).toBe(1)
  expect(result.toolResultsSentToModel).toBe(0)
  expect(JSON.parse(result.content)).toEqual({ data: { me: user } })
})
