import classnames from 'classnames'
import css from './Wrapper.module.css'

export default function Wrapper({
  width = Wrapper.content,
  padding = Wrapper.horizontal,
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

Wrapper.page = css.widthPage
Wrapper.content = css.widthContent
Wrapper.text = css.widthText

Wrapper.none = css.paddingNone
Wrapper.normal = css.paddingNormal
Wrapper.vertical = css.paddingVertical
Wrapper.horizontal = css.paddingHorizontal
