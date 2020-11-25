import classnames from 'classnames'
import { Animation, Rhythm } from  '@utils'
import { TerminalSelect, TerminalText } from  '@components'
import css from './Entry.module.css'

export default function Entry({
  isFocus = false,
  type = Entry.passive,
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, type, Rhythm.md, className)
  const symbolClassList = classnames(css.symbol, { [Animation.blink]: isFocus })

  let caption = []
  let terminal = []

  React.Children.forEach(children, (child) => {
    if (
      child && (
        child.type === TerminalSelect ||
        child.type === TerminalText
      )
    ) {
      terminal.push(child)
    } else {
      caption.push(child)
    }
  })

  return (
    <div className={classList} {...props}>
      <div className={css.lead}>
        <div className={symbolClassList} />
        <div className={classnames(css.caption, Rhythm.md)}>{caption}</div>
      </div>

      {
        terminal.length > 0 &&
        <div className={css.content}>{terminal}</div>
      }
    </div>
  )
}

Entry.action = css.action
Entry.passive = css.passive
