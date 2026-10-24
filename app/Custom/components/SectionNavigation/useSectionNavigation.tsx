import type * as React from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { SectionNavigation, type PageSection } from './index'

interface SectionNavigationOptions {
  sections: readonly PageSection[]
  label: string
}

interface SectionNavigationResult {
  navigation: React.ReactElement
  closeNavigation: () => void
}

export const useSectionNavigation = ({
  sections,
  label,
}: SectionNavigationOptions): SectionNavigationResult => {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const navigationRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const navigate = useNavigate()
  const closeNavigation = useCallback((): void => setExpanded(false), [])
  const onToggle = useCallback((): void => setExpanded((value) => !value), [])
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key === 'Escape') {
        setExpanded(false)
        toggleRef.current?.focus()
      }
    },
    [],
  )

  useEffect(() => {
    const panels = sections.map(({ id }) => document.getElementById(id))
    let frame = 0
    const update = (): void => {
      frame = 0
      let current = 0
      panels.forEach((panel, index) => {
        if (panel && panel.getBoundingClientRect().top <= innerHeight * 0.4) {
          current = index
        }
      })
      const scrollable = document.documentElement.scrollHeight - innerHeight
      if (scrollable > 0 && scrollY >= scrollable - 2) {
        current = sections.length - 1
      }
      setActive(current)
      const progress = Math.max(
        0,
        Math.min(1, scrollY / Math.max(1, scrollable)),
      )
      navigationRef.current?.style.setProperty(
        '--reading-progress',
        `${progress * 100}%`,
      )
    }
    const schedule = (): void => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [sections])

  useEffect(() => {
    let animation = 0
    const cancel = (): void => {
      cancelAnimationFrame(animation)
      animation = 0
    }
    const onPointerDown = (event: PointerEvent): void => {
      cancel()
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setExpanded(false)
      }
    }
    const onScrollKey = (event: KeyboardEvent): void => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
          'Escape',
        ].includes(event.key)
      ) {
        cancel()
      }
    }
    const onClick = (event: MouseEvent): void => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const anchor =
        event.target instanceof Element ? event.target.closest('a') : null
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }
      const url = new URL(anchor.href)
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search
      ) {
        return
      }
      const id = url.hash.slice(1)
      if (!sections.some((section) => section.id === id)) {
        return
      }
      const target = document.getElementById(id)
      if (!target) {
        return
      }
      event.preventDefault()
      cancel()
      setExpanded(false)
      const start = scrollY
      const offset =
        (parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0) + (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
      const end = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - innerHeight,
          start + target.getBoundingClientRect().top - offset,
        ),
      )
      const finish = (): void => {
        animation = 0
        target.focus({ preventScroll: true })
        // Обновляем адрес после анимации: ScrollRestoration иначе сразу прыгнет к якорю.
        void navigate(`${url.pathname}${url.search}${url.hash}`, {
          preventScrollReset: true,
        })
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: end, behavior: 'instant' })
        finish()
        return
      }
      const began = performance.now()
      const step = (now: number): void => {
        const progress = Math.min(1, (now - began) / 500)
        const eased =
          progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
        window.scrollTo({
          top: start + (end - start) * eased,
          behavior: 'instant',
        })
        if (progress < 1) {
          animation = requestAnimationFrame(step)
        } else {
          finish()
        }
      }
      animation = requestAnimationFrame(step)
    }
    // Capture объединяет обычные ссылки и Link в хиро, шапке, футере и оглавлении.
    document.addEventListener('click', onClick, true)
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onScrollKey)
    return () => {
      cancel()
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onScrollKey)
    }
  }, [sections, navigate])

  return {
    closeNavigation,
    navigation: (
      <SectionNavigation
        label={label}
        sections={sections}
        active={active}
        expanded={expanded}
        panelId={panelId}
        navigationRef={navigationRef}
        toggleRef={toggleRef}
        onToggle={onToggle}
        onKeyDown={onKeyDown}
      />
    ),
  }
}
