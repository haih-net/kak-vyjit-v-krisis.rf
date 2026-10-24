import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const NavigationStyled = styled.nav`
  position: fixed;
  top: 16px;
  left: auto;
  right: 16px;
  z-index: ${theme.zIndex.header + 1};
  .contents-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    width: 44px;
    min-height: 44px;
    margin-left: auto;
    padding: 10px 14px;
    border: 1px solid ${theme.colors.borderHover};
    border-radius: ${theme.radii.md};
    background: ${theme.backgrounds.paper};
    color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadows.md};
    font-size: 15px;
    text-align: left;
  }
  .contents-panel {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: min(320px, calc(100vw - 32px));
    max-height: calc(100dvh - 100px);
    overflow-y: auto;
    padding: 20px;
    border: 1px solid ${theme.colors.border};
    background: ${theme.backgrounds.paper};
    box-shadow: ${theme.shadows.md};
  }
  &[data-expanded='true'] .contents-panel {
    display: block;
  }
  .contents-caption {
    margin-bottom: 16px;
    color: ${theme.colors.text.secondary};
    font-size: 13px;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    padding-block: 10px;
    border-bottom: 1px solid ${theme.colors.divider};
    color: ${theme.colors.text.secondary};
    font-size: 15px;
    line-height: 1.4;
    text-decoration: none;
  }
  a[aria-current] {
    color: ${theme.colors.primary};
    font-weight: 700;
  }
  .current-mark {
    visibility: hidden;
  }
  a[aria-current] .current-mark {
    visibility: visible;
  }
  a:hover {
    color: ${theme.colors.primary};
  }
  .reading-meter {
    height: 2px;
    background: ${theme.colors.divider};
    margin-top: 24px;
  }
  .reading-meter span {
    display: block;
    height: 100%;
    width: var(--reading-progress, 0%);
    background: ${theme.colors.primary};
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    top: 50%;
    bottom: auto;
    left: max(24px, calc((100vw - 1680px) / 2 + 24px));
    right: auto;
    width: 176px;
    transform: translateY(-50%);
    .contents-toggle {
      display: none;
    }
    .contents-panel,
    &[data-expanded='true'] .contents-panel {
      display: block;
      position: static;
      width: auto;
      max-height: calc(100dvh - 48px);
      padding: 0;
      border: 0;
      box-shadow: none;
    }
  }
`
