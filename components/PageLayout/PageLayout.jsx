import classnames from 'classnames'
import { GlobalFooter, GlobalHeader } from 'components'
import css from './PageLayout.module.css'

export default function PageLayout({
  pageProps,
  Component,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props}>
      <GlobalHeader />

      <main id="content" className={css.main}>
        <Component {...pageProps} />
      </main>

      <GlobalFooter />
    </div>
  )
}
