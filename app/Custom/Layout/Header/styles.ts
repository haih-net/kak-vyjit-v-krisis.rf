import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const HeaderStyled = styled.header`
  position: relative;
  top: 0;
  z-index: 300;
  background: ${theme.backgrounds.page};
  border-bottom: 0;
  .header-inner {
    max-width: ${theme.layout.maxWidth};
    margin: auto;
    min-height: 80px;
    padding: 18px ${theme.layout.gutter};
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;

    @media (min-width: ${theme.breakpoints.xs}px) {
      padding: 18px ${theme.layout.gutter};
      gap: 20px;
    }

    @media (min-width: ${theme.breakpoints.lg}px) {
      flex-direction: row;
      align-items: center;
      min-height: 96px;
      padding: 24px ${theme.layout.gutter};
    }
  }
  .site-brand {
    font-size: clamp(17px, 2vw, 25px);
    font-weight: 700;
    letter-spacing: -0.035em;
    overflow-wrap: anywhere;
    max-width: calc(100% - 56px);
  }
  nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 14px;
  }
  .ai-button {
    margin: 0;
  }
  .feedback-button,
  .signin-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 10px 16px;
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    color: ${theme.colors.text.primary};
    background: white;
    font: inherit;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }
  .feedback-button:hover,
  .signin-link:hover {
    background: #f0f4f7;
  }
  .account-menu {
    position: relative;
    min-width: 0;
  }
  .account-menu summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    list-style: none;
  }
  .account-menu summary::-webkit-details-marker {
    display: none;
  }
  .account-menu summary:hover,
  .account-menu[open] summary {
    background: #f0f4f7;
  }
  .account-menu summary:focus-visible {
    outline: none;
  }
  .account-avatar {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #e8eef3;
    flex-shrink: 0;
  }
  .account-name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .account-dropdown {
    padding: 10px;
    margin-top: 8px;
    border: 1px solid ${theme.colors.border};
    border-radius: 12px;
    background: white;
    box-shadow: 0 12px 32px #262c351a;
    min-width: 220px;
    @media (min-width: ${theme.breakpoints.lg}px) {
      position: absolute;
      right: 0;
      top: 100%;
    }
  }
  .account-dropdown p {
    margin: 4px 12px 8px;
    color: ${theme.colors.text.secondary};
    font-size: 12px;
  }
  .account-dropdown a,
  .account-dropdown button {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: ${theme.colors.text.primary};
  }
  .account-dropdown a:hover {
    background: #f0f4f7;
  }
  .account-dropdown button {
    margin-top: 4px;
    border-top: 1px solid ${theme.colors.border};
  }
`
