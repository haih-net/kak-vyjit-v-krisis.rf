import { guidePaths } from './app/guidePaths'
import type { Config } from '@react-router/dev/config'
export default {
  ssr: true,
  prerender: ['/', '/karta-saita', ...guidePaths],
  routeDiscovery: { mode: 'initial' },
} satisfies Config
