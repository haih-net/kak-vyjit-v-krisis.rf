import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { AssetsPage, assetsPageData } from '../Custom/pages/AssetsPage'

export const handle = {
  seo: {
    title: 'Активы и пассивы: как оценить своё имущество — Как выжить в кризис',
    description: assetsPageData.description,
    path: assetsPageData.path,
    image: { ...assetsPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: assetsPageData.title,
        path: assetsPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { AssetsPage as default }
