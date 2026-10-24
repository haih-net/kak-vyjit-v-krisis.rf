import type * as React from 'react'
import { Link } from 'react-router'
import { GuideArticle } from '../../components/GuideArticle'
import { illustration, illustrationSrcSet } from './assets/illustration'
import { articleSections } from './sections'
import type { ContentPageData } from '../interfaces'

export const jointOrdersPageData: ContentPageData = {
  path: '/sovmestnye-zakazy',
  title: 'Выполняйте совместные заказы с партнёрами',
  description:
    'Объедините свои навыки и ресурсы с возможностями партнёров. Распределите работу и оплату, выполните совместный заказ и предложите клиенту нужное продолжение.',
  image: {
    src: illustration,
    srcSet: illustrationSrcSet,
    alt: 'Столяр, установщик и доставщик вместе выполняют заказ на мебель.',
  },
}

export const JointOrdersPage: React.FC = () => (
  <GuideArticle
    title={jointOrdersPageData.title}
    lead={jointOrdersPageData.description}
    illustration={jointOrdersPageData.image.src}
    illustrationSrcSet={illustrationSrcSet}
    illustrationAlt={jointOrdersPageData.image.alt}
    sections={articleSections}
  >
    <section id="part-1" tabIndex={-1} aria-labelledby="heading-1">
      <h2 id="heading-1">Совместный результат для клиента</h2>
      <p>
        Если клиенту нужна работа, которую вы не можете выполнить целиком,
        найдите партнёра для недостающей части. Вы можете взять на себя знакомые
        задачи, а партнёр — предоставить оборудование или выполнить работу по
        своей специальности.
      </p>
      <p>
        Например, если вы изготавливаете мебель, договоритесь с доставщиком и
        установщиком о заказе под ключ. Клиент получит готовую мебель дома, а
        вам не придётся покупать транспорт и нанимать постоянную бригаду ради
        одного заказа.
      </p>
    </section>
    <section id="part-2" tabIndex={-1} aria-labelledby="heading-2">
      <h2 id="heading-2">Распределите работу до начала</h2>
      <p>
        До начала заказа договоритесь, что именно получит клиент, сколько он
        заплатит и к какому сроку будет готова работа. Распределите задачи,
        назначьте ответственного за общение с клиентом и определите порядок
        оплаты каждому участнику.
      </p>
      <p>
        Посчитайте собственное вознаграждение с учётом координации. Организация
        чужой работы занимает время; если оно не учтено, большой совместный
        заказ может дать меньше дохода, чем небольшой самостоятельный.
      </p>
    </section>
    <section id="part-3" tabIndex={-1} aria-labelledby="heading-3">
      <h2 id="heading-3">Что нужно после выполненного заказа</h2>
      <p>
        Купленное оборудование может требовать обслуживания, сайт — обновления,
        сложная услуга — обучения, товар — расходных материалов. Выясните, что
        из этого действительно нужно клиентам.
      </p>
      <p>
        Предложите конкретное продолжение с понятным объёмом и ценой. Повторная
        продажа возникает из следующей задачи клиента. Объясните, какую задачу
        решит новая услуга и как часто она нужна. Предлагайте регулярное
        обслуживание только там, где у клиента есть повторяющаяся задача.
      </p>
    </section>
    <section id="part-4" tabIndex={-1} aria-labelledby="heading-4">
      <h2 id="heading-4">С чего начать</h2>
      <p>
        Выберите один тип завершённых заказов и поговорите с несколькими
        клиентами об их дальнейших задачах. Найдите исполнителя для недостающей
        части и проверьте совместную работу на небольшом объёме.
      </p>
      <p>
        Смотрите на доход после всех выплат, соблюдение сроков и желание
        клиентов обратиться снова. Эти результаты помогают решить, стоит ли
        делать предложение постоянным.
      </p>
    </section>
    <nav id="related" tabIndex={-1} aria-label="Связанные материалы">
      <h2>Связанные темы</h2>
      <ul>
        <li>
          <Link to="/smena-deyatelnosti">
            Сравните наёмную работу, фриланс и бизнес
          </Link>
        </li>
        <li>
          <Link to="/partnerskie-prodazhi">
            Зарабатывайте на партнёрских продажах
          </Link>
        </li>
        <li>
          <Link to="/svobodnye-moshchnosti">
            Зарабатывайте на свободных мощностях
          </Link>
        </li>
      </ul>
    </nav>
  </GuideArticle>
)
