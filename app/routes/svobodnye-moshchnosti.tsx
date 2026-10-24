import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { CapacityPage, capacityPageData } from '../Custom/pages/CapacityPage'

export const handle = {
  seo: {
    title: 'Как заработать на свободных мощностях — Как выжить в кризис',
    description: capacityPageData.description,
    path: capacityPageData.path,
    image: { ...capacityPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: capacityPageData.title,
        path: capacityPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { CapacityPage as default }
