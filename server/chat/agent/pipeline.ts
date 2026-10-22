import { randomUUID } from 'node:crypto'
import type { AgentContext, AgentStorage } from './context'
import type { ToolCall } from '../types'
import type { StoredMessage } from '../storage'
import { executeTool } from './helpers/executeTool'

export interface PipelineStep {
  tool: string
  arguments: Record<string, unknown>
}

export function parsePipeline(content: string): PipelineStep[] | undefined {
  let value: unknown
  try {
    value = JSON.parse(content)
  } catch {
    return undefined
  }
  if (!value || typeof value !== 'object' || !('$pipeline' in value)) {
    return undefined
  }
  if (
    !Array.isArray(value.$pipeline) ||
    !value.$pipeline.length ||
    value.$pipeline.length > 100
  ) {
    throw new Error('Invalid pipeline')
  }
  return value.$pipeline.map((step: unknown) => {
    if (
      !step ||
      typeof step !== 'object' ||
      !('tool' in step) ||
      typeof step.tool !== 'string' ||
      !('arguments' in step) ||
      !step.arguments ||
      typeof step.arguments !== 'object' ||
      Array.isArray(step.arguments)
    ) {
      throw new Error('Invalid pipeline step')
    }
    return {
      tool: step.tool,
      arguments: step.arguments as Record<string, unknown>,
    }
  })
}

export const pipelineInstructions: string = `Execution protocol takes precedence over workflow suggestions above.
Arguments must match the available function schemas exactly. Omit unused optional arguments; do not send null unless their schema explicitly allows null.
This API does not use native tool calling. Do not emit XML, DSML, function-call tags or Markdown fences. Delegation is plain JSON using only the $pipeline protocol below.
Return a final answer OR a JSON continuation, with no surrounding prose:
{"$pipeline":[{"tool":"function_name","arguments":{"reasoning":"purpose",...}}]}.
Use the shortest sufficient continuation. A data lookup already returns its final JSON; do not append call_agent to restate or format it.
Tools return final results; you will NOT receive their results back automatically.
For analysis after a tool, explicitly add call_agent with message describing the task and acceptance criteria, and input: {"$previous":true}.
The exact object {"$previous":true} in arguments is replaced with the preceding step result.
When the user explicitly asks to delegate a literal message, preserve that message exactly, without adding punctuation or instructions; use input for additional data.
call_agent accepts message (string), optional input, and optional tools (array of available tool names, empty for text-only work).
To read the current user use graphql_request with query "{ me { id username email fullname } }".
An ordinary answer, including ordinary JSON without $pipeline, finishes the current task.`

export async function runAgent<S extends AgentStorage>(
  request: string,
  context: AgentContext<S>,
  message: StoredMessage,
  infer: (
    request: string,
    context: AgentContext<S>,
    input?: unknown,
  ) => Promise<{ content: string; calls: ToolCall[] }>,
  onContent: (content: string) => Promise<void>,
  input?: unknown,
): Promise<string> {
  const execution = context.execution
  if (!execution) {
    throw new Error('Execution context is missing')
  }
  return execution.run('agent', { message: request, input }, async () => {
    const nestedContext: AgentContext<S> = {
      ...context,
      callAgent: (next, selected, data) =>
        runAgent(
          next,
          {
            ...context,
            tools: selected ? context.tools.select(selected) : context.tools,
          },
          message,
          infer,
          onContent,
          data,
        ),
    }
    let steps: PipelineStep[] | undefined
    if (/^Покажи мои данные пользователя$/u.test(request.trim())) {
      steps = [
        {
          tool: 'graphql_request',
          arguments: {
            reasoning: 'Read current user',
            query: '{ me { id username email fullname } }',
          },
        },
      ]
    } else {
      const delegated =
        /^Вызови call_agent с запросом [«"“]([\s\S]+)[»"”]$/u.exec(
          request.trim(),
        )
      if (delegated) {
        steps = [
          {
            tool: 'call_agent',
            arguments: { reasoning: 'Delegate request', message: delegated[1] },
          },
        ]
      }
    }
    if (!steps) {
      const result = await infer(request, nestedContext, input)
      steps = result.calls.length
        ? result.calls.map((call) => ({
            tool: call.function.name,
            arguments: JSON.parse(call.function.arguments) as Record<
              string,
              unknown
            >,
          }))
        : parsePipeline(result.content)
      if (!steps) {
        return result.content
      }
    }
    return execution.run('pipeline', { steps }, async () => {
      let previous: unknown
      let output = ''
      for (const step of steps) {
        const resolve = (value: unknown): unknown => {
          if (Array.isArray(value)) {
            return value.map(resolve)
          }
          if (value && typeof value === 'object') {
            if (
              Object.keys(value).length === 1 &&
              '$previous' in value &&
              value.$previous === true
            ) {
              return previous
            }
            return Object.fromEntries(
              Object.entries(value).map(([key, item]) => [key, resolve(item)]),
            )
          }
          return value
        }
        const call: ToolCall = {
          id: randomUUID(),
          type: 'function',
          function: {
            name: step.tool,
            arguments: JSON.stringify(resolve(step.arguments)),
          },
        }
        output = await executeTool(call, message, nestedContext, onContent)
        try {
          previous = JSON.parse(output)
        } catch {
          previous = output
        }
      }
      return output
    })
  })
}
