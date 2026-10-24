import type * as React from 'react'
import { Link } from 'react-router'
import { assetsPageData } from '../AssetsPage'
import { capacityPageData } from '../CapacityPage'
import { demandPageData } from '../DemandPage'
import { directSalesPageData } from '../DirectSalesPage'
import { jointOrdersPageData } from '../JointOrdersPage'
import { needsPageData } from '../NeedsPage'
import { obligationsPageData } from '../ObligationsPage'
import { ownedServicesPageData } from '../OwnedServicesPage'
import { partnerSalesPageData } from '../PartnerSalesPage'
import { pastCostsPageData } from '../PastCostsPage'
import { workFormatPageData } from '../WorkFormatPage'
import { mainSections } from '../MainPage/sections'
import type { ContentPageData } from '../interfaces'
import { SiteMapPageStyled } from './styles'

const pagesBySection: Readonly<
  Partial<Record<string, readonly ContentPageData[]>>
> = {
  'reduce-burden': [
    needsPageData,
    obligationsPageData,
    pastCostsPageData,
    assetsPageData,
  ],
  'increase-income': [
    demandPageData,
    directSalesPageData,
    partnerSalesPageData,
    ownedServicesPageData,
    capacityPageData,
    jointOrdersPageData,
  ],
  'work-format': [workFormatPageData],
}

export const SiteMapPage: React.FC = () => (
  <SiteMapPageStyled>
    <h1 tabIndex={-1}>Карта сайта</h1>
    <p className="introduction">
      Выберите свою задачу: сократить расходы и долговую нагрузку, найти новые
      заказы или изменить формат работы. В каждой статье — примеры и шаги, с
      которых можно начать.
    </p>
    <nav aria-label="Карта сайта">
      <ul className="site-tree">
        <li>
          <Link className="root-link" to="/">
            Как выжить в кризис
          </Link>
          <ul>
            {mainSections.map(({ id, label }) => {
              const pages = pagesBySection[id]
              if (!pages) {
                return null
              }
              return (
                <li className="topic-group" key={id}>
                  <h2>
                    <Link className="group-link" to={`/#${id}`}>
                      {label}
                    </Link>
                  </h2>
                  <ul>
                    {pages.map((page) => (
                      <li key={page.path}>
                        <article className="page-summary">
                          <img
                            src={page.image.src}
                            alt={page.image.alt}
                            width={1536}
                            height={1024}
                            loading="lazy"
                          />
                          <div>
                            <h3>
                              <Link to={page.path}>{page.title}</Link>
                            </h3>
                            <p>{page.description}</p>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>
  </SiteMapPageStyled>
)
