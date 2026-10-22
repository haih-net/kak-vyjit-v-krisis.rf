import type { Message } from '../storage'

// Execution audit records are checked separately from conversation messages.
export function conversation(messages: Message[]): Message[] {
  return messages.filter((message) => {
    if (message.role !== 'tool_call') {
      return true
    }
    return JSON.parse(message.content).kind !== 'execution'
  })
}
