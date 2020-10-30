import classnames from 'classnames'
import { GlobalFooter, GlobalHeader } from '@components'
import css from './PageLayout.module.css'

export default function PageLayout({
  className,
  children,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props}>
      <GlobalHeader />

      <main id="content" className={css.main}>
        {children}
      </main>

      <GlobalFooter />
    </div>
  )
}
