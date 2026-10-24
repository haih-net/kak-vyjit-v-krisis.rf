import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  JointOrdersPage,
  jointOrdersPageData,
} from '../Custom/pages/JointOrdersPage'

export const handle = {
  seo: {
    title:
      'Совместные заказы с партнёрами и повторные продажи — Как выжить в кризис',
    description: jointOrdersPageData.description,
    path: jointOrdersPageData.path,
    image: { ...jointOrdersPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: jointOrdersPageData.title,
        path: jointOrdersPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { JointOrdersPage as default }
