import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  DirectSalesPage,
  directSalesPageData,
} from '../Custom/pages/DirectSalesPage'

export const handle = {
  seo: {
    title:
      'Прямые продажи через свой сайт и рекомендации — Как выжить в кризис',
    description: directSalesPageData.description,
    path: directSalesPageData.path,
    image: { ...directSalesPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      { name: directSalesPageData.title, path: directSalesPageData.path },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { DirectSalesPage as default }
