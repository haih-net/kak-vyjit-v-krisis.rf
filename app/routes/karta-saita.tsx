import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
import { SiteMapPage } from '../Custom/pages/SiteMapPage'

export const handle = {
  seo: {
    title: 'Карта сайта — Как выжить в кризис',
    description:
      'Все материалы о том, как выжить в кризис: сокращение расходов и долговой нагрузки, новые источники дохода, прямые и партнёрские продажи, смена работы.',
    path: '/karta-saita',
    breadcrumbs: [
      { name: 'Как выжить в кризис', path: '/' },
      { name: 'Карта сайта', path: '/karta-saita' },
    ],
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { SiteMapPage as default }
