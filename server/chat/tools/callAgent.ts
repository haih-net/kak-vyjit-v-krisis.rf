import type { ChatTool } from '../types'

export const callAgentTool: ChatTool = {
  definition: {
    type: 'function',
    function: {
      name: 'call_agent',
      description:
        'Execute a new agent task in the same chat. Direct routes run before the model. Specify the task, purpose and acceptance criteria.',
      parameters: {
        type: 'object',
        properties: {
          reasoning: { type: 'string' },
          message: { type: 'string' },
          input: {},
          tools: { type: 'array', items: { type: 'string' } },
        },
        required: ['reasoning', 'message'],
        additionalProperties: false,
      },
    },
  },
  prepare(args) {
    if (typeof args.message !== 'string' || !args.message.trim()) {
      throw new Error('Agent message is required')
    }
    if (
      args.tools !== undefined &&
      (!Array.isArray(args.tools) ||
        !args.tools.every((name) => typeof name === 'string'))
    ) {
      throw new Error('Invalid agent tools')
    }
    const message = args.message
    const names = args.tools as string[] | undefined
    return {
      reasoning: args.reasoning,
      execute: async (context) => {
        if (!context.callAgent) {
          throw new Error('Agent execution is unavailable')
        }
        return context.callAgent(message, names, args.input)
      },
    }
  },
}
