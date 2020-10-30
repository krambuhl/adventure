import classnames from 'classnames'
import css from './GlobalFooter.module.css'

export default function GlobalFooter({
  className,
  children,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <footer className={classList} {...props}>
      {children}
    </footer>
  )
}
