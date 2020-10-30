import classnames from 'classnames'
import css from './PageLayout.module.css'

export default function PageLayout({
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props}>
      {children}
    </div>
  )
}
