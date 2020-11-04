import classnames from 'classnames'
import css from './VisualContainer.module.css'

export default function VisualContainer({
  padding = VisualContainer.normal,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, padding, className)

  return (
    <div className={classList} {...props}>
      {children}
    </div>
  )
}

VisualContainer.normal = css.paddingNormal
VisualContainer.none = css.paddingNone
