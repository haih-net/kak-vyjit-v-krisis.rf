import { styled } from '@linaria/react'
import { theme } from '../../../../theme'

export const HeroStyled = styled.section`
  display: grid;
  gap: 28px;
  padding-block: 28px 56px;
  h1 {
    font-size: clamp(42px, 5.3vw, 80px);
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: -0.045em;
    margin-bottom: 28px;
  }
  .hero-introduction p {
    max-width: 34ch;
    font-size: clamp(19px, 2.1vw, 28px);
    line-height: 1.45;
  }
  .hero-illustration {
    display: block;
    width: 100%;
    height: auto;
  }
  .hero-directions {
    display: grid;
    gap: 32px;
    h2 {
      font-size: clamp(27px, 3vw, 40px);
      line-height: 1.15;
      letter-spacing: -0.035em;
      margin-bottom: 14px;
    }
    p {
      max-width: 40ch;
      margin-bottom: 14px;
      font-size: clamp(18px, 1.8vw, 24px);
      line-height: 1.45;
    }
    a {
      display: inline-block;
      padding-block: 8px;
      font-size: clamp(18px, 1.8vw, 24px);
    }
  }
  @media (min-width: ${theme.breakpoints.sm}px) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
    align-items: center;
    gap: 48px 20px;
    padding-block: 48px 80px;
    .hero-directions {
      grid-column: 1 / -1;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 64px;
    }
  }
`
