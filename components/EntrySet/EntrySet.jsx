import classnames from 'classnames'
import { Rhythm } from '@utils'
import css from './EntrySet.module.css'

export default function EntrySet({
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
