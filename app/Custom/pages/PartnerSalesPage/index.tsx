import type * as React from 'react'
import { Link } from 'react-router'
import { GuideArticle } from '../../components/GuideArticle'
import { illustration, illustrationSrcSet } from './assets/illustration'
import { articleSections } from './sections'
import type { ContentPageData } from '../interfaces'

export const partnerSalesPageData: ContentPageData = {
  path: '/partnerskie-prodazhi',
  title: 'Зарабатывайте на партнёрских продажах',
  description:
    'Предлагайте клиентам подходящие товары и услуги партнёров за вознаграждение. Договоритесь об учёте заказов, выплатах и ответственности за результат.',
  image: {
    src: illustration,
    srcSet: illustrationSrcSet,
    alt: 'Продавец материалов знакомит покупательницу с мастером по установке.',
  },
}

export const PartnerSalesPage: React.FC = () => (
  <GuideArticle
    title={partnerSalesPageData.title}
    lead={partnerSalesPageData.description}
    illustration={partnerSalesPageData.image.src}
    illustrationSrcSet={illustrationSrcSet}
    illustrationAlt={partnerSalesPageData.image.alt}
    sections={articleSections}
  >
    <section id="part-1" tabIndex={-1} aria-labelledby="heading-1">
      <h2 id="heading-1">Когда есть основа для партнёрства</h2>
      <p>
        Если у вас уже есть посетители или заказчики, выясните, что ещё им нужно
        до, после или во время работы с вами.
      </p>
      <p>
        Если вы делаете ремонт, клиенты могут просить помочь с выбором
        материалов. Если разрабатываете сайты — с рекламой, если продаёте мебель
        — с доставкой и сборкой. Начните с вопросов, которые уже задают вам.
        Если обращений пока нет, сначала найдите покупателей для своего
        основного предложения.
      </p>
    </section>
    <section id="part-2" tabIndex={-1} aria-labelledby="heading-2">
      <h2 id="heading-2">Что именно предложить</h2>
      <p>
        Выберите партнёра, чьи товары или услуги нужны вашим клиентам. Можно
        разместить его предложение, передавать подходящие обращения или включить
        услугу в совместный заказ.
      </p>
      <p>
        Не обязательно становиться исполнителем каждой услуги или закупать
        товары. Но нужно ясно объяснять клиенту, кто выполняет работу, кто
        принимает оплату и к кому обращаться по вопросам результата.
      </p>
    </section>
    <section id="part-3" tabIndex={-1} aria-labelledby="heading-3">
      <h2 id="heading-3">Как учитывать вознаграждение</h2>
      <p>
        До первых продаж согласуйте, какое действие оплачивается: обращение,
        оплаченный заказ или завершённая работа. Определите способ учёта, сроки
        выплаты и порядок действий при отмене заказа.
      </p>
      <p>
        Например, партнёрский код или согласованный реестр заказов позволяет
        сопоставлять обращения с продажами. Для проверки договорённостей на
        небольшом объёме не всегда нужна сложная система.
      </p>
    </section>
    <section id="part-4" tabIndex={-1} aria-labelledby="heading-4">
      <h2 id="heading-4">Как проверить пользу</h2>
      <p>
        Начните с одного предложения, соответствующего реальному запросу.
        Проверьте качество работы партнёра, обратную связь клиентов и выплаты по
        завершённым заказам.
      </p>
      <p>
        Сопоставьте вознаграждение со временем на консультации и сопровождение.
        Неудачная рекомендация влияет на доверие к вам, поэтому размер процента
        не должен быть единственным критерием выбора.
      </p>
    </section>
    <nav id="related" tabIndex={-1} aria-label="Связанные материалы">
      <h2>Связанные темы</h2>
      <ul>
        <li>
          <Link to="/svoi-servisy">
            Сравните платные сервисы с собственным решением
          </Link>
        </li>
        <li>
          <Link to="/sovmestnye-zakazy">
            Выполняйте совместные заказы с партнёрами
          </Link>
        </li>
        <li>
          <Link to="/svoi-kanaly-prodazh">Развивайте свои каналы продаж</Link>
        </li>
      </ul>
    </nav>
  </GuideArticle>
)
