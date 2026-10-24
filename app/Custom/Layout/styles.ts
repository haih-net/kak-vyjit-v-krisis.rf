import { styled } from '@linaria/react'
import { theme } from '../theme'
import { ChatWidgetContainer } from '../components/Chat/ChatWidget/styles'

export const CustomLayoutSectionStyled = styled.section`
  max-width: ${theme.layout.maxWidth};
  padding: 44px 24px;
  margin: auto;

  @media (min-width: ${theme.breakpoints.sm}px) {
    padding: 64px 40px;
  }
`

export const CustomLayoutArticleStyled = styled.article`
  max-width: ${theme.layout.maxWidth};
  margin-inline: auto;
  padding: 24px ${theme.layout.gutter} 80px;
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-bottom: 32px;
    font-size: 14px;
    color: ${theme.colors.text.secondary};
  }
  .breadcrumbs a {
    padding-block: 4px;
  }
  .breadcrumbs span {
    align-self: center;
  }
  .article-hero {
    display: grid;
    align-items: center;
    gap: 24px;
    padding-bottom: 48px;
  }
  h1 {
    font-size: clamp(32px, 3.6vw, 52px);
    line-height: 1.12;
    letter-spacing: -0.04em;
    margin: 0 0 24px;
    overflow-wrap: break-word;
  }
  .article-lead {
    font-size: clamp(19px, 1.8vw, 24px);
    line-height: 1.5;
    max-width: 40ch;
  }
  .article-hero img {
    display: block;
    width: 100%;
    height: auto;
  }
  .article-reading {
    max-width: 760px;
    margin-inline: auto;
    font-size: 18px;
    line-height: 1.75;
  }
  .article-reading > section {
    padding-block: 28px;
  }
  h2 {
    font-size: clamp(25px, 2.4vw, 32px);
    line-height: 1.25;
    letter-spacing: -0.025em;
    margin: 0 0 20px;
  }
  p + p {
    margin-top: 18px;
  }
  ol,
  ul {
    padding-left: 24px;
  }
  li + li {
    margin-top: 12px;
  }
  a {
    color: ${theme.colors.primary};
    text-underline-offset: 4px;
    text-decoration: none;
    text-decoration-thickness: 1px;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  #related {
    border-top: 1px solid ${theme.colors.divider};
    margin-top: 36px;
    padding-top: 36px;
  }
  #related ul {
    list-style: none;
    padding: 0;
  }
  #related a {
    display: inline-block;
    padding-block: 8px;
  }
  [tabindex='-1']:focus {
    outline: none;
  }
  [tabindex='-1']:focus-visible {
    outline: none;
  }
  @media (min-width: ${theme.breakpoints.sm}px) {
    .article-hero {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 40px;
      padding-bottom: 64px;
    }
    .article-reading {
      font-size: 19px;
    }
    .article-reading > section {
      padding-block: 36px;
    }
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    max-width: 1680px;
    padding-left: 240px;
    padding-right: 56px;
  }
`

export const CustomLayoutGridStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: ${theme.breakpoints.xs}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${theme.breakpoints.sm}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

export const CustomLayoutMainStyled = styled.main`
  flex: 1;
  min-width: 0;
`

export const CustomLayoutStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.foreground};
  background: ${theme.backgrounds.page};
  ${ChatWidgetContainer} {
    position: relative;
    bottom: auto;
    right: auto;
    align-self: flex-end;
    margin: 0 24px 24px;
    @media (min-width: ${theme.breakpoints.sm}px) {
      position: fixed;
      bottom: 24px;
      right: 24px;
      margin: 0;
    }
  }
  .ai-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 14px 20px;
    background: ${theme.colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    transition: background 0.2s;
    text-decoration: none;
  }
  .ai-button:hover {
    background: #205681;
    text-decoration: underline;
  }
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    padding: 12px 20px;
    background: white;
    z-index: 1100;
  }
  .skip-link:focus {
    top: 12px;
  }
`

export const HtmlStyled = styled.html`
  font-family: ${theme.font};
  color: ${theme.colors.foreground};
  background: ${theme.backgrounds.page};
  line-height: 1.5;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  scroll-padding-top: 24px;
  body {
    margin: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;
  }
  :where(h1, h2, h3, h4, p, ul) {
    margin: 0;
    padding: 0;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
  }
  button {
    touch-action: manipulation;
  }
  button:enabled {
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  img {
    max-width: 100%;
  }
  :where(&) a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  :focus-visible {
    outline: none;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`
