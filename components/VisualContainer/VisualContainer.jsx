import classnames from 'classnames'
import css from './VisualContainer.module.css'

export default function VisualContainer({
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
