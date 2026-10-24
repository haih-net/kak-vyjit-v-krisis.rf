import type * as React from 'react'
import { Link } from 'react-router'
import { workshop, workshopSrcSet } from './assets/workshop'
import { HeroStyled } from './styles'

export const Hero: React.FC = () => (
  <HeroStyled id="start" tabIndex={-1} aria-labelledby="hero-heading">
    <div className="hero-introduction">
      <h1 id="hero-heading" tabIndex={-1}>
        Как выжить <br />в кризис
      </h1>
      <p>
        Когда прежний заработок даётся труднее, посмотрите в двух направлениях:
        какие расходы можно сократить и где найти дополнительный доход.
      </p>
    </div>
    <img
      className="hero-illustration"
      src={workshop}
      srcSet={workshopSrcSet}
      sizes="(min-width: 1680px) 747px, (min-width: 1200px) calc((100vw - 316px) * 1.15 / 2.1), (min-width: 800px) calc((90vw - 20px) * 1.15 / 2.1), calc(100vw - 2 * clamp(20px, 5vw, 80px))"
      width={1536}
      height={1024}
      fetchPriority="high"
      alt="Мастер ремонтирует деревянный стул в своей мастерской, женщина помогает его придерживать."
    />
    <div className="hero-directions">
      <div>
        <h2>Уменьшить нагрузку</h2>
        <p>Пересмотрите расходы и обязательства, которые стали непосильными.</p>
        <Link to="/#reduce-burden">
          Разобраться с обязательствами <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div>
        <h2>Увеличить доход</h2>
        <p>Найдите новое применение своим навыкам, имуществу и связям.</p>
        <Link to="/#increase-income">
          Найти возможности для дохода <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </HeroStyled>
)
