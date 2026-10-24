import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  ObligationsPage,
  obligationsPageData,
} from '../Custom/pages/ObligationsPage'

export const handle = {
  seo: {
    title:
      'Как снизить нагрузку по долгам и обязательствам — Как выжить в кризис',
    description: obligationsPageData.description,
    path: obligationsPageData.path,
    image: { ...obligationsPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: obligationsPageData.title,
        path: obligationsPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ObligationsPage as default }
