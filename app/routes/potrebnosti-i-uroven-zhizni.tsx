import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { NeedsPage, needsPageData } from '../Custom/pages/NeedsPage'

export const handle = {
  seo: {
    title: 'Как сократить расходы при снижении дохода — Как выжить в кризис',
    description: needsPageData.description,
    path: needsPageData.path,
    image: { ...needsPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: needsPageData.title,
        path: needsPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { NeedsPage as default }
