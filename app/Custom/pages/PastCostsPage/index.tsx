import type * as React from 'react'
import { Link } from 'react-router'
import { GuideArticle } from '../../components/GuideArticle'
import { illustration, illustrationSrcSet } from './assets/illustration'
import { articleSections } from './sections'
import type { ContentPageData } from '../interfaces'

export const pastCostsPageData: ContentPageData = {
  path: '/proshlye-zatraty',
  title: 'Отделяйте прошлые затраты от будущих',
  description:
    'Решите, стоит ли продолжать вложения в проект: сравните будущие расходы и результат, оцените стоимость выхода и то, что вы сможете использовать дальше.',
  image: {
    src: illustration,
    srcSet: illustrationSrcSet,
    alt: 'Фотограф собирает оборудование для работы вне прежней студии.',
  },
}

export const PastCostsPage: React.FC = () => (
  <GuideArticle
    title={pastCostsPageData.title}
    lead={pastCostsPageData.description}
    illustration={pastCostsPageData.image.src}
    illustrationSrcSet={illustrationSrcSet}
    illustrationAlt={pastCostsPageData.image.alt}
    sections={articleSections}
  >
    <section id="part-1" tabIndex={-1} aria-labelledby="heading-1">
      <h2 id="heading-1">Почему трудно остановиться</h2>
      <p>
        После больших затрат отказ воспринимается как признание потери.
        Возникает желание продолжить хотя бы ради того, чтобы вложения не
        оказались напрасными. Так бывает с покупкой, обучением, проектом или
        собственным делом.
      </p>
      <p>
        Но следующие платежи не возвращают прежние расходы автоматически. Для
        решения важно, какую пользу принесёт дальнейшее вложение и сколько ещё
        потребуется.
      </p>
    </section>
    <section id="part-2" tabIndex={-1} aria-labelledby="heading-2">
      <h2 id="heading-2">Сравнивайте будущие варианты</h2>
      <p>
        Для продолжения оцените оставшиеся затраты, ожидаемые поступления, время
        и обязательства. Для выхода — возможную выручку, расходы на завершение и
        обязательства, которые сохранятся.
      </p>
      <p>
        Если проект почти готов и востребован, завершение может быть разумным.
        Если спрос не подтвердился, а каждый следующий этап требует всё больше
        ресурсов, сумма прошлых вложений не заменяет основания для продолжения.
      </p>
    </section>
    <section id="part-3" tabIndex={-1} aria-labelledby="heading-3">
      <h2 id="heading-3">Что остаётся ценным</h2>
      <p>
        Потраченные деньги могли превратиться в оборудование, знания,
        выполненную работу и отношения с клиентами. Эти результаты могут
        пригодиться в другом формате деятельности. Их не нужно автоматически
        считать потерянными.
      </p>
      <p>
        Например, если вы закрываете студию, вы можете сохранить инструменты и
        продолжить работать с клиентами на выезде или в почасовой аренде.
        Сравните затраты на такой формат с постоянной арендой студии.
      </p>
    </section>
    <section id="part-4" tabIndex={-1} aria-labelledby="heading-4">
      <h2 id="heading-4">Как принять следующее решение</h2>
      <p>
        Запишите, на что пойдут следующие вложения и какой результат вы
        ожидаете. Отдельно отметьте, что уже подтверждено: есть ли заказчик,
        согласована ли цена, известны ли расходы. Надежду найти клиента пока
        учитывайте как предположение.
      </p>
      <p>
        Сравните этот шаг с другими способами использовать те же деньги и время.
        Если единственный аргумент — «уже столько вложено», пересмотрите расчёт.
        Если дальнейший результат оправдывает затраты, прошлые трудности сами по
        себе не требуют остановки.
      </p>
    </section>
    <nav id="related" tabIndex={-1} aria-label="Связанные материалы">
      <h2>Связанные темы</h2>
      <ul>
        <li>
          <Link to="/aktivy-i-passivy">
            Разберитесь, что для вас актив, а что пассив
          </Link>
        </li>
        <li>
          <Link to="/smena-deyatelnosti">
            Сравните наёмную работу, фриланс и бизнес
          </Link>
        </li>
        <li>
          <Link to="/obyazatelstva">
            Снизьте нагрузку по долгам и обязательствам
          </Link>
        </li>
      </ul>
    </nav>
  </GuideArticle>
)
