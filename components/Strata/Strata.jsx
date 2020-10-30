import classnames from 'classnames'
import css from './Strata.module.css'

export default function Strata({
  width = Strata.content,
  padding = Strata.normal,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, width, padding, className)

  return (
    <div className={classList} {...props}>
      <div className={css.container}>
        {children}
      </div>
    </div>
  )
}

Strata.page = css.widthPage
Strata.content = css.widthContent
Strata.text = css.widthText

Strata.none = css.paddingNone
Strata.normal = css.paddingNormal
