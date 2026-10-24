import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  PartnerSalesPage,
  partnerSalesPageData,
} from '../Custom/pages/PartnerSalesPage'

export const handle = {
  seo: {
    title: 'Партнёрские продажи: заказы и вознаграждение — Как выжить в кризис',
    description: partnerSalesPageData.description,
    path: partnerSalesPageData.path,
    image: { ...partnerSalesPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: partnerSalesPageData.title,
        path: partnerSalesPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { PartnerSalesPage as default }
