import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { DemandPage, demandPageData } from '../Custom/pages/DemandPage'

export const handle = {
  seo: {
    title:
      'Как найти новый спрос на свои навыки и услуги — Как выжить в кризис',
    description: demandPageData.description,
    path: demandPageData.path,
    image: { ...demandPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      { name: demandPageData.title, path: demandPageData.path },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { DemandPage as default }
