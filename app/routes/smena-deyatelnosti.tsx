import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  WorkFormatPage,
  workFormatPageData,
} from '../Custom/pages/WorkFormatPage'

export const handle = {
  seo: {
    title:
      'Наёмная работа, фриланс или бизнес: как выбрать — Как выжить в кризис',
    description: workFormatPageData.description,
    path: workFormatPageData.path,
    image: { ...workFormatPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: workFormatPageData.title,
        path: workFormatPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { WorkFormatPage as default }
