import { useCallback, useEffect, useRef } from 'react'
import type * as React from 'react'
import { Link, useLocation } from 'react-router'
import { useOpenChatWithMessage } from '../../components/Chat/hooks/useOpenChatWithMessage'
import { HeaderStyled } from './styles'
import { SignOutButton } from '../../components/Auth/SignOutButton'
import { useAppContext } from '../../hooks/useAppContext'

export const Header: React.FC = () => {
  const accountMenu = useRef<HTMLDetailsElement>(null)
  const location = useLocation()
  const { user, userLoading, openFeedback } = useAppContext()

  const handleFeedback = useCallback(() => {
    openFeedback()
  }, [openFeedback])
  const openChat = useOpenChatWithMessage()
  const handleOpenChat = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openChat(event)
    },
    [openChat],
  )

  const closeMenu = useCallback(() => {
    if (accountMenu.current) {
      accountMenu.current.open = false
    }
  }, [])
  useEffect(() => {
    const closeAccount = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        accountMenu.current &&
        !accountMenu.current.contains(event.target)
      ) {
        accountMenu.current.open = false
      }
    }
    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && accountMenu.current?.open) {
        accountMenu.current.open = false
        accountMenu.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeAccount)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', closeAccount)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const showSignin = false

  return (
    <HeaderStyled>
      <div className="header-inner">
        <Link className="site-brand" to="/">
          Как выжить в кризис
        </Link>
        <nav aria-label="Действия сайта">
          {/* <Link
            to="/users"
            onClick={closeMenu}
            aria-current={
              location.pathname.startsWith('/users') ? 'page' : undefined
            }
          >
            Пользователи
          </Link> */}
          <button
            type="button"
            className="feedback-button"
            onClick={handleFeedback}
          >
            Написать
          </button>
          {location.pathname === '/ai' ? null : (
            <button
              type="button"
              className="ai-button"
              onClick={handleOpenChat}
            >
              Спросить ИИ <span aria-hidden="true">↗</span>
            </button>
          )}
          {!userLoading &&
            (user ? (
              <details className="account-menu" ref={accountMenu}>
                <summary
                  aria-label={`Меню пользователя: ${user.fullname || user.username || 'Мой аккаунт'}`}
                >
                  <span className="account-avatar" aria-hidden="true">
                    {(user.fullname || user.username || 'Я')
                      .slice(0, 1)
                      .toUpperCase()}
                  </span>
                  <span className="account-name">
                    {user.fullname || user.username || 'Мой аккаунт'}
                  </span>
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div className="account-dropdown">
                  <p>{user.sudo ? 'Администратор' : 'Мой аккаунт'}</p>
                  <Link to="/panel/profile" onClick={closeMenu}>
                    Мой профиль
                  </Link>
                  {user.sudo && (
                    <>
                      <Link to="/users" onClick={closeMenu}>
                        Пользователи
                      </Link>
                      <Link to="/admin-panel" onClick={closeMenu}>
                        Админка
                      </Link>
                    </>
                  )}
                  <SignOutButton variant="ghost" />
                </div>
              </details>
            ) : (
              showSignin && (
                <Link className="signin-link" to="/signin" onClick={closeMenu}>
                  Войти
                </Link>
              )
            ))}
        </nav>
      </div>
    </HeaderStyled>
  )
}
