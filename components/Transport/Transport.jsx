import { useState, useEffect, useContext } from 'react'
import msTimecode from 'ms-to-timecode'
import classnames from 'classnames'
import { TransportContext } from '@contexts'
import css from './Transport.module.css'

export default function Transport({
  className,
  ...props
}) {
  const [isPlaying, setPlaying] = useState(false)
  const { startTime, currentTime, time, setTime } = useContext(TransportContext)
  const classList = classnames(css.root, className)

  const handleClick = () => {
    setPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      setTime(currentTime)
    }
  }, [isPlaying, currentTime])


  return (
    <div className={classList} {...props}>
      <div className={css.data}>
        <div className={css.stat}>
          <span className={css.label}>start: </span>
          <span className={css.timestamp}>{msTimecode(startTime, 30)}</span>
        </div>

        <div className={css.stat}>
          <span className={css.label}>current: </span>
          <span className={css.timestamp}>{msTimecode(currentTime, 30)}</span>
        </div>

        <div className={css.stat}>
          <span className={css.label}>snapshop: </span>
          <span className={css.timestamp}>{msTimecode(time, 30)}</span>
        </div>
      </div>

      <div className={css.actions}>
        <button className={css.button} onClick={handleClick}>{isPlaying ? 'pause' : 'play'}</button>
      </div>
    </div>
  )
}
