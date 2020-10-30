import { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { Text } from '@components'
import { useKeyPress } from '@hooks'
import css from './TerminalSelect.module.css'

export function TerminalOption({
  label,
  value,
  isActiveCursor,
  isActive,
  isLoading,
  handleActivate,
  handleCursor,
  children,
  className,
  ...props
}) {
  const ref = useRef(null)
  const classList = classnames(css.option, {
    [css.isActive]: isActive,
    [css.isLoading]: isLoading
  }, className)

  useEffect(() => {
    if (isActiveCursor) {
      ref.current.focus({ preventScroll: true })
    }
  }, [isActiveCursor])

  return (
    <li className={classList} {...props}>
      <Link href={`/${value}`}>
        <a
          ref={ref}
          href={`/${value}`}
          onClick={handleActivate}
          onMouseEnter={handleCursor}
          onFocus={handleCursor}
          className={css.link}
        >
          <span className={css.text}>{children}</span>

          {
            label &&
            <Text as="span" size={Text.sm} className={css.label}>{label}</Text>
          }
        </a>
      </Link>
    </li>
  )
}

export default function TerminalSelect({
  caption = '(select one)',
  children,
  className,
  ...props
}) {
  const elRef = useRef()
  const timer = useRef()
  const [cursorIndex, setCursorIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const classList = classnames(css.root, className)
  const childrenCount = React.Children.count(children)

  const handleActivate = (index) => (ev) => {
    // ev.preventDefault()
    setActiveIndex(index)
    setLoading(true)
  }

  const handleCursor = (index) => () => {
    setCursorIndex(index)
  }

  const handleArrow = (ev, nextIndex) => {
    if (elRef.current.contains(document.activeElement)) {
      ev.preventDefault()

      setCursorIndex(
        nextIndex < 0
          ? childrenCount - 1
          : nextIndex >= childrenCount
            ? 0
            : nextIndex
      )
    }
  }

  useKeyPress(ev =>  {
    switch(ev.key) {
      case 'ArrowUp': return handleArrow(ev, cursorIndex - 1)
      case 'ArrowDown': return handleArrow(ev, cursorIndex + 1)
    }
  }, [cursorIndex])

  return (
    <div ref={elRef} className={classList} {...props}>
      <div className={css.caption}><Text size={Text.sm}>(select one)</Text></div>

      <ul>
        {
          React.Children.map(children, (item, index) => {
            return React.cloneElement(item, {
              isLoading,
              isActive: activeIndex === index,
              isActiveCursor: cursorIndex === index,
              handleActivate: handleActivate(index),
              handleCursor: handleCursor(index)
            })
          })
        }
      </ul>
    </div>
  )
}
