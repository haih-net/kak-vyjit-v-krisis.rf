import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'
import type { AgentStorage } from './context'

export class DepthLimitError extends Error {}

export class Execution {
  private readonly scope = new AsyncLocalStorage<{
    id: string
    depth: number
  }>()

  constructor(
    private readonly storage: AgentStorage,
    private readonly chatId: string,
    private readonly messageId: string,
    private readonly signal: AbortSignal,
    readonly maxDepth = 10,
  ) {}

  get depth(): number {
    return this.scope.getStore()?.depth ?? 0
  }

  async run<T>(
    name: string,
    parameters: unknown,
    execute: () => Promise<T>,
  ): Promise<T> {
    this.signal.throwIfAborted()
    const parent = this.scope.getStore()
    const depth = (parent?.depth ?? 0) + 1
    const id = randomUUID()
    const allowed = depth <= this.maxDepth
    await this.storage.append(this.chatId, {
      id,
      createdAt: new Date().toISOString(),
      role: 'tool_call',
      replyToId: this.messageId,
      success: allowed,
      content: JSON.stringify({
        kind: 'execution',
        id,
        parentId: parent?.id ?? null,
        depth,
        function: { name, arguments: parameters },
        ...(!allowed
          ? { error: `Maximum execution depth ${this.maxDepth} exceeded` }
          : {}),
      }),
    })
    if (!allowed) {
      throw new DepthLimitError(
        `Maximum execution depth ${this.maxDepth} exceeded`,
      )
    }
    const result = await this.scope.run({ id, depth }, execute)
    this.signal.throwIfAborted()
    return result
  }
}
