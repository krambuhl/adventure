import classnames from 'classnames'
import { GlobalFooter, GlobalHeader } from '@components'
import css from './PageLayout.module.css'

export default function PageLayout({
  pageProps,
  Component,
  fullScreen,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, {
    'is-page-fullscreen': Component.fullScreen
  }, className)

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
