// @ts-check

/** @type {import("vite").UserConfigFnPromise} */
module.exports = async (configEnv) => {
  const { createTestConfig } = await import('./vitest.shared.mjs')
  return createTestConfig(configEnv, {
    include: ['tests/scenarios/**/*.test.ts'],
    fileParallelism: false,
    testTimeout: 300000,
    hookTimeout: 15000,
    env: {
      DATABASE_FILENAME: ':memory:',
      JWT_SECRET: 'scenario-auth-test-secret',
      CHAT_EMAIL_NOTIFICATIONS_ENABLED: 'false',
      CHAT_TOOL_EXPLANATIONS_ENABLED: 'false',
    },
  })
}
