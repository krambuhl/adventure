import { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { Rhythm } from 'styles/utils'
import { Wrapper } from 'components'
import { useFocus } from 'hooks'
import css from './EntryContainer.module.css'

export default function EntryContainer({
  children,
  className,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props}>
      <Wrapper>
        <div className={classnames(css.container, Rhythm.md)}>
          {children}
        </div>
      </Wrapper>
    </div>
  )
}
