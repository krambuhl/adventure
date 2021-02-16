import { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { Text } from 'components'
import { useKeyPress } from 'hooks'
import css from './TerminalSelect.module.css'

export function TerminalOption({
  label,
  value,
  isActive,
  isLoading,
  handleActivate,
  handleCursor,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.option, {
    [css.isActive]: isActive,
    [css.isLoading]: isLoading
  }, className)

  return (
    <li className={classList} {...props}>
      <Link href={`${value}`}>
        <a
          onClick={handleActivate}
          onMouseEnter={handleCursor}
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

export function TerminalLabel({
  children,
  className,
  ...props
}) {
  const classList = classnames(css.groupLabel, className)

  return (
    <li className={classList} {...props}>
      <p>{children}</p>
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
  const [cursorIndex, setCursorIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const classList = classnames(css.root, className)
  const childrenCount = React.Children.count(children)

  const handleActivate = (index) => (ev) => {
    setLoading(true)
  }

  const handleCursor = (index) => () => {
    setActiveIndex(index)
    setCursorIndex(index)
  }

  return (
    <div
      ref={elRef}
      className={classList}
      {...props}
    >
      {
        caption &&
        <div className={css.caption}><Text size={Text.sm}>{caption}</Text></div>
      }

      <ul>
        {
          React.Children.map(children, (item, index) => {
            return React.cloneElement(item, {
              isLoading,
              isActive: index === activeIndex,
              isActiveCursor: index === cursorIndex,
              isExpanded: index === childrenCount - 1,
              handleActivate: handleActivate(index),
              handleCursor: handleCursor(index)
            })
          })
        }
      </ul>
    </div>
  )
}
