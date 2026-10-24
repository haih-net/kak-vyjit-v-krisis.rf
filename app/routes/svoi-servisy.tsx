import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import {
  OwnedServicesPage,
  ownedServicesPageData,
} from '../Custom/pages/OwnedServicesPage'

export const handle = {
  seo: {
    title:
      'Платные сервисы или своё решение: сравнение затрат — Как выжить в кризис',
    description: ownedServicesPageData.description,
    path: ownedServicesPageData.path,
    image: { ...ownedServicesPageData.image, width: 1536, height: 1024 },
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      {
        name: ownedServicesPageData.title,
        path: ownedServicesPageData.path,
      },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { OwnedServicesPage as default }
