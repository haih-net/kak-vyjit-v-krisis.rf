import type * as React from 'react'
import { Link } from 'react-router'
import { FooterStyled } from './styles'

export const Footer: React.FC = () => (
  <FooterStyled>
    <Link to="/">Как выжить в кризис</Link>
    <nav aria-label="Разделы сайта">
      <Link to="/#reduce-burden">Уменьшить нагрузку</Link>
      <Link to="/#increase-income">Увеличить доход</Link>
      <Link to="/karta-saita">Карта сайта</Link>
    </nav>
    <a
      target="_blank"
      href="https://fi1osof.ru"
      aria-label="Разработка и сопровождение — 𝕱i1osof"
      title="Разработка и сопровождение — 𝕱i1osof"
    >
      By 𝕱
    </a>
  </FooterStyled>
)
