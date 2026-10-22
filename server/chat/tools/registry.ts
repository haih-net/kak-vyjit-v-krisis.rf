import { callAgentTool } from './callAgent'
import type { AgentStorage } from '../agent/context'
import { graphqlRequestTool } from './graphqlRequest'
import { webSearchTool } from './webSearch'
import { getSystemInfoTool } from './getSystemInfo'
import { readSkillTool } from './readSkill'
import { hasSkills } from '../skills/registry'
import type { ChatTool, PreparedTool, ToolCall, ToolDefinition } from '../types'

const tools: readonly ChatTool[] = [
  callAgentTool,
  graphqlRequestTool,
  ...(hasSkills ? [readSkillTool] : []),
  webSearchTool,
  getSystemInfoTool,
]
export class ToolRegistry<S extends AgentStorage = AgentStorage> {
  readonly definitions: ToolDefinition[]

  constructor(private readonly entries: readonly ChatTool<S>[] = tools) {
    this.definitions = entries.map(({ definition }) => definition)
  }

  select(names: string[]): ToolRegistry<S> {
    for (const name of names) {
      if (
        !this.entries.some((entry) => entry.definition.function.name === name)
      ) {
        throw new Error(`Unknown tool: ${name}`)
      }
    }
    return new ToolRegistry(
      this.entries.filter((entry) =>
        names.includes(entry.definition.function.name),
      ),
    )
  }

  prepare(call: ToolCall): PreparedTool<S> {
    const tool = this.entries.find(
      ({ definition }) => definition.function.name === call.function.name,
    )
    if (!tool) {
      throw new Error(`Unknown tool: ${call.function.name}`)
    }
    const args: unknown = JSON.parse(call.function.arguments)
    if (
      !args ||
      typeof args !== 'object' ||
      Array.isArray(args) ||
      !('reasoning' in args) ||
      typeof args.reasoning !== 'string' ||
      !args.reasoning.trim()
    ) {
      throw new Error(
        `A non-empty reasoning is required before every tool call`,
      )
    }
    const prepared = tool.prepare({ ...args, reasoning: args.reasoning })
    return {
      reasoning: prepared.reasoning,
      execute: (context) =>
        context.execution
          ? context.execution.run(call.function.name, args, () =>
              prepared.execute(context),
            )
          : prepared.execute(context),
    }
  }
}

export function prepareTool(call: ToolCall): PreparedTool {
  return new ToolRegistry().prepare(call)
}
