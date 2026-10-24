import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { workshop } from '../Custom/pages/MainPage/View/Hero/assets/workshop'
import { MainPage } from 'app/Custom/pages/MainPage'

export const handle = {
  seo: {
    title: 'Как выжить в кризис: сократить расходы и увеличить доход',
    description:
      'Как выжить в кризис при снижении дохода: пересмотреть расходы и долги, найти новые заказы, развить прямые продажи или сменить работу. Примеры и первые шаги.',
    path: '/',
    image: {
      src: workshop,
      alt: 'Мастер ремонтирует деревянный стул в своей мастерской, женщина помогает его придерживать.',
      width: 1536,
      height: 1024,
    },
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default MainPage
