import { styled } from '@linaria/react'
import { theme } from '../../../theme'

export const MainPageViewStyled = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: ${theme.layout.gutter};
  padding-bottom: 80px;
  color: ${theme.colors.text.primary};
  section:focus {
    outline: none;
  }
  section:focus-visible {
    outline: none;
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    max-width: 1680px;
    padding-left: 240px;
    padding-right: 56px;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  .page-introduction {
    max-width: 76ch;
    padding-block: 32px 56px;
    font-size: 19px;
    line-height: 1.65;
    p + p {
      margin-top: 20px;
    }
  }
  > section:not(:first-child) {
    padding-block: 40px;
    border-top: 1px solid ${theme.colors.divider};
    scroll-margin-top: 24px;
    > h2 {
      max-width: 26ch;
      font-size: clamp(30px, 3.3vw, 44px);
      line-height: 1.15;
      letter-spacing: -0.035em;
      margin-bottom: 24px;
    }
    p {
      max-width: 72ch;
      font-size: 18px;
      line-height: 1.7;
      margin-bottom: 16px;
    }
    .topic {
      margin-top: 32px;
    }
    h3 {
      max-width: 40ch;
      font-size: 24px;
      line-height: 1.3;
      margin-bottom: 16px;
      font-weight: 600;
    }
  }
  @media (min-width: ${theme.breakpoints.md}px) {
    > section:not(:first-child) {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.65fr);
      gap: 0 40px;
      padding-block: 64px;
      > h2 {
        grid-column: 1;
        grid-row: 1 / span 20;
      }
      > p,
      > .topic {
        grid-column: 2;
      }
    }
  }
`
