import { expect, it } from 'vitest'
import { send, user } from './helpers'

it('routes a nested agent request before invoking the model', async () => {
  const result = await send(
    'Вызови call_agent с запросом «Покажи мои данные пользователя»',
  )
  expect(result.modelCalls).toBe(0)
  expect(result.graphqlCalls).toBe(1)
  expect(result.toolResultsSentToModel).toBe(0)
  expect(JSON.parse(result.content)).toEqual({ data: { me: user } })
})
