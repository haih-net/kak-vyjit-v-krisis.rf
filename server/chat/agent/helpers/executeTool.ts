import { DepthLimitError } from '../execution'
import { randomUUID } from 'node:crypto'
import { logDevError } from '../../../errorLogging'
import type { AgentContext, AgentStorage } from '../context'
import type { StoredMessage } from '../../storage'
import type { ToolCall } from '../../types'

export async function executeTool<S extends AgentStorage>(
  call: ToolCall,
  message: StoredMessage,
  context: AgentContext<S>,
  onContent: (content: string) => Promise<void>,
): Promise<string> {
  const { storage, chatId } = context
  await storage.append(chatId, {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    role: 'tool_call',
    success: true,
    replyToId: message.id,
    content: JSON.stringify(
      {
        ...call,
        function: {
          ...call.function,
          arguments: (() => {
            try {
              return JSON.parse(call.function.arguments) as unknown
            } catch {
              return call.function.arguments
            }
          })(),
        },
      },
      null,
      2,
    ),
  })
  let result: string
  try {
    const tool = context.tools.prepare(call)
    if (context.config.toolExplanations) {
      const explanation = `\n\n${tool.reasoning.trim()}\n\n`
      await onContent(explanation)
    }
    result = await tool.execute(context)
  } catch (error) {
    logDevError('chat.tool', error, { chatId, toolCallId: call.id })
    if (error instanceof DepthLimitError || context.signal.aborted) {
      throw error
    }
    result = JSON.stringify({
      error: error instanceof Error ? error.message : 'Tool failed',
    })
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(result)
  } catch {
    parsed = result
  }
  const failed =
    !!parsed &&
    typeof parsed === 'object' &&
    (('error' in parsed && !!parsed.error) ||
      ('errors' in parsed &&
        Array.isArray(parsed.errors) &&
        parsed.errors.length > 0))
  await storage.append(chatId, {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    role: 'tool',
    success: !failed,
    replyToId: message.id,
    content: JSON.stringify({ toolCallId: call.id, result: parsed }, null, 2),
  })
  if (context.signal.aborted) {
    throw new Error('Request cancelled')
  }
  return result
}
