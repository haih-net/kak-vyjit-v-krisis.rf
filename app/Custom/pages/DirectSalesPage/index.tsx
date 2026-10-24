import type * as React from 'react'
import { Link } from 'react-router'
import { GuideArticle } from '../../components/GuideArticle'
import { illustration, illustrationSrcSet } from './assets/illustration'
import { articleSections } from './sections'
import type { ContentPageData } from '../interfaces'

export const directSalesPageData: ContentPageData = {
  path: '/svoi-kanaly-prodazh',
  title: 'Развивайте свои каналы продаж',
  description:
    'Развивайте прямые продажи через свой сайт, рекомендации и повторные заказы. Сравните расходы на привлечение и обслуживание клиентов с комиссией площадок.',
  image: {
    src: illustration,
    srcSet: illustrationSrcSet,
    alt: 'Керамист принимает прямой заказ и упаковывает чашку рядом со своим каталогом.',
  },
}

export const DirectSalesPage: React.FC = () => (
  <GuideArticle
    title={directSalesPageData.title}
    lead={directSalesPageData.description}
    illustration={directSalesPageData.image.src}
    illustrationSrcSet={illustrationSrcSet}
    illustrationAlt={directSalesPageData.image.alt}
    sections={articleSections}
  >
    <section id="part-1" tabIndex={-1} aria-labelledby="heading-1">
      <h2 id="heading-1">Когда прямой канал полезен</h2>
      <p>
        Если стоимость получения заказа через посредника стала обременительной,
        сравните её с прямыми продажами. Учитывайте не только комиссию, но и
        функции площадки: привлечение покупателей, обработку заказов, доставку и
        поддержку.
      </p>
      <p>
        Собственный канал может дополнять существующие площадки. Увеличивайте
        долю прямых продаж, если после всех расходов у вас остаётся больше денег
        и вы справляетесь с обслуживанием заказов.
      </p>
    </section>
    <section id="part-2" tabIndex={-1} aria-labelledby="heading-2">
      <h2 id="heading-2">Начните с уже существующего сайта</h2>
      <p>
        Проверьте, понимает ли посетитель, что вы предлагаете, сколько это стоит
        и как заказать. Старый сайт можно дополнить каталогом, магазином,
        записью на услуги или формой повторного заказа.
      </p>
      <p>
        Если вы оказываете услуги, начните с описания предложения, примеров
        работы и удобного способа связаться с вами. Если продаёте товары,
        укажите цены, наличие и условия получения. Проверьте, удаётся ли
        оформить заказ без лишних вопросов.
      </p>
    </section>
    <section id="part-3" tabIndex={-1} aria-labelledby="heading-3">
      <h2 id="heading-3">Откуда придут покупатели</h2>
      <p>
        Сайт сам по себе не создаёт аудиторию. Посмотрите, где люди уже
        знакомятся с вами: рекомендации, публикации, прежние заказы,
        профессиональные сообщества. Сделайте прямое обращение понятным и
        удобным для этой аудитории.
      </p>
      <p>
        Предлагайте прежним клиентам нужное продолжение работы и поддерживайте
        связь в согласованном формате. Если у вас пока нет клиентов, сначала
        сформулируйте предложение и найдите первых заказчиков. Их вопросы
        помогут понять, какая информация и какие функции нужны на сайте.
      </p>
    </section>
    <section id="part-4" tabIndex={-1} aria-labelledby="heading-4">
      <h2 id="heading-4">Как оценить результат</h2>
      <p>
        Начните с одного востребованного товара или услуги и пройдите путь от
        обращения до выполнения заказа. Проверьте, кто отвечает клиенту, как
        подтверждаются условия и сколько времени занимает обработка.
      </p>
      <p>
        Сравните доход после расходов на привлечение, сайт, обслуживание и
        выполнение заказа с другими каналами. Учитывайте собственное время.
        Расширяйте то, что даёт подтверждённый результат.
      </p>
    </section>
    <nav id="related" tabIndex={-1} aria-label="Связанные материалы">
      <h2>Связанные темы</h2>
      <ul>
        <li>
          <Link to="/partnerskie-prodazhi">
            Зарабатывайте на партнёрских продажах
          </Link>
        </li>
        <li>
          <Link to="/svoi-servisy">
            Сравните платные сервисы с собственным решением
          </Link>
        </li>
        <li>
          <Link to="/novye-potrebnosti">
            Найдите новый спрос на ваши навыки и услуги
          </Link>
        </li>
      </ul>
    </nav>
  </GuideArticle>
)
