import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { PastCostsPage, pastCostsPageData } from '../Custom/pages/PastCostsPage'

export const handle = {
  seo: {
    title: 'Прошлые затраты: стоит ли вкладывать дальше — Как выжить в кризис',
    description: pastCostsPageData.description,
    path: pastCostsPageData.path,
    image: { ...pastCostsPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: pastCostsPageData.title,
        path: pastCostsPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { PastCostsPage as default }
