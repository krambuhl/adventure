import { useEffect } from 'react'
import classnames from 'classnames'
import { Rhythm } from 'components/utils'
import css from './TerminalText.module.css'

export default function TerminalText({
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, Rhythm.md, className)

  return (
    <div className={classList} {...props}>
      {children}
    </div>
  )
}
