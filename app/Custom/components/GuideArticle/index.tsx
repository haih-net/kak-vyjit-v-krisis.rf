import type * as React from 'react'
import { Link } from 'react-router'
import { CustomLayoutArticleStyled } from '../../Layout/styles'
import type { PageSection } from '../SectionNavigation'
import { useSectionNavigation } from '../SectionNavigation/useSectionNavigation'

interface GuideArticleProps extends React.PropsWithChildren {
  title: string
  lead: string
  illustration: string
  illustrationAlt: string
  sections: readonly PageSection[]
}

export const GuideArticle: React.FC<GuideArticleProps> = ({
  title,
  lead,
  illustration,
  illustrationAlt,
  sections,
  children,
}) => {
  const { navigation } = useSectionNavigation({
    sections,
    label: 'Разделы статьи',
  })
  return (
    <>
      {navigation}
      <CustomLayoutArticleStyled>
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <Link to="/">Как выжить в кризис</Link>
          <span aria-hidden="true">/</span>
          <span>Материал</span>
        </nav>
        <header className="article-hero" id="article-start" tabIndex={-1}>
          <div>
            <h1 tabIndex={-1}>{title}</h1>
            <p className="article-lead">{lead}</p>
          </div>
          <img
            src={illustration}
            alt={illustrationAlt}
            width={1536}
            height={1024}
            fetchPriority="high"
          />
        </header>
        <div className="article-reading">{children}</div>
      </CustomLayoutArticleStyled>
    </>
  )
}
