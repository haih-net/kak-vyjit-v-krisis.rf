import type * as React from 'react'
import { Link } from 'react-router'
import { CustomLayoutArticleStyled } from '../../Layout/styles'
import type { PageSection } from '../SectionNavigation'
import { useSectionNavigation } from '../SectionNavigation/useSectionNavigation'

interface GuideArticleProps extends React.PropsWithChildren {
  title: string
  lead: string
  illustration: string
  illustrationSrcSet: string
  illustrationAlt: string
  sections: readonly PageSection[]
}

export const GuideArticle: React.FC<GuideArticleProps> = ({
  title,
  lead,
  illustration,
  illustrationAlt,
  illustrationSrcSet,
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
            srcSet={illustrationSrcSet}
            sizes="(min-width: 1680px) 672px, (min-width: 1200px) calc((100vw - 336px) / 2), (min-width: 800px) calc(45vw - 20px), calc(100vw - 2 * clamp(20px, 5vw, 80px))"
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
