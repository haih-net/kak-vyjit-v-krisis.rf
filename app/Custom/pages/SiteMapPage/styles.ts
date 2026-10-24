import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const SiteMapPageStyled = styled.article`
  max-width: 1200px;
  margin-inline: auto;
  padding: 32px ${theme.layout.gutter} 80px;
  h1 {
    font-size: clamp(34px, 4vw, 52px);
    line-height: 1.15;
    letter-spacing: -0.035em;
    margin-bottom: 24px;
  }
  .introduction {
    font-size: 19px;
    line-height: 1.6;
    margin-bottom: 40px;
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    text-underline-offset: 4px;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul ul {
    margin-top: 16px;
    margin-left: 6px;
    padding-left: 16px;
    border-left: 1px solid ${theme.colors.borderHover};
  }
  .root-link,
  .group-link {
    display: inline-block;
    padding-block: 10px;
    font-size: 21px;
    line-height: 1.35;
  }
  .root-link {
    font-weight: 700;
  }
  .page-summary {
    display: grid;
    align-items: center;
    gap: 20px;
    padding-block: 8px 24px;
  }
  .page-summary img {
    display: block;
    width: 100%;
    max-width: 260px;
    height: auto;
  }
  .topic-group + .topic-group {
    margin-top: 40px;
  }
  h2 {
    margin: 0;
  }
  h3 {
    font-size: 23px;
    line-height: 1.3;
    margin-bottom: 16px;
  }
  .page-summary p {
    font-size: 18px;
    line-height: 1.6;
    max-width: 52ch;
  }
  @media (min-width: ${theme.breakpoints.sm}px) {
    ul ul {
      margin-left: 12px;
      padding-left: 28px;
    }
    .page-summary {
      grid-template-columns: 200px minmax(0, 1fr);
      gap: 32px;
    }
  }
`
