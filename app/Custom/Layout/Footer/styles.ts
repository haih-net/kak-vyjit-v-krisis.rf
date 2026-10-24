import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const FooterStyled = styled.footer`
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  margin-inline: auto;
  padding: 32px ${theme.layout.gutter} 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: ${theme.colors.text.secondary};
  font-size: 15px;
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
  }
  a {
    display: inline-block;
    padding-block: 10px;
  }
`
