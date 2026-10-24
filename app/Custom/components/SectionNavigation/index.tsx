import type * as React from 'react'
import { NavigationStyled } from './styles'

export interface PageSection {
  id: string
  label: string
}

interface SectionNavigationProps {
  label: string
  sections: readonly PageSection[]
  active: number
  expanded: boolean
  panelId: string
  navigationRef: React.RefObject<HTMLElement | null>
  toggleRef: React.RefObject<HTMLButtonElement | null>
  onToggle: () => void
  onKeyDown: React.KeyboardEventHandler<HTMLElement>
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  label,
  active,
  expanded,
  panelId,
  navigationRef,
  toggleRef,
  onToggle,
  onKeyDown,
}) => (
  <NavigationStyled
    ref={navigationRef}
    aria-label={label}
    data-expanded={expanded}
    onKeyDown={onKeyDown}
  >
    <button
      ref={toggleRef}
      type="button"
      aria-label={expanded ? 'Закрыть меню разделов' : 'Открыть меню разделов'}
      className="contents-toggle"
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onToggle}
    >
      <span aria-hidden="true">{expanded ? '×' : '☰'}</span>
    </button>
    <div className="contents-panel" id={panelId}>
      <p className="contents-caption">На этой странице</p>
      <ol>
        {sections.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === index ? 'location' : undefined}
            >
              <span>{label}</span>
              <span className="current-mark" aria-hidden="true">
                ←
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className="reading-meter" aria-hidden="true">
        <span />
      </div>
    </div>
  </NavigationStyled>
)
