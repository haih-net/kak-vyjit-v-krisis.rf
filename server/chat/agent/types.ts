import type { TokenUsage } from '../storage'

export interface AgentOutput {
  write: (content: string, signal: AbortSignal) => Promise<void>
}

export interface AgentResult {
  id: string
  success: true
  content: string
  usage: TokenUsage
}

export interface AgentRunOptions {
  /** Selects the LLM response mode; output delivery is provided by the context. */
  stream?: boolean
  onAuthenticated?: (chatId: string) => void | Promise<void>
  diagnostics?: () => Record<string, unknown>
}
