import { useState, useEffect, useContext } from 'react'
import msTimecode from 'ms-to-timecode'
import classnames from 'classnames'
import { TransportContext } from '@contexts'
import css from './Transport.module.css'

export default function Transport({
  className,
  ...props
}) {
  const [isPlaying, setPlaying] = useState(true)
  const [isReversed, setReversed] = useState(false)
  const [speed, setSpeed] = useState(1)
  const { frame, setFrame, setFrameSize } = useContext(TransportContext)
  const classList = classnames(css.root, className)

  const handlePlayPause = () => {
    setPlaying(!isPlaying)
  }

  const handleReset = () => {
    setFrame(0)
  }

  const handleSpeed = () => {
    switch (speed) {
      case 8: return setSpeed(0.1)
      case 0.1: return setSpeed(0.5)
      case 0.5: return setSpeed(1)
      case 1: return setSpeed(2)
      case 2: return setSpeed(4)
      case 4: return setSpeed(8)
    }
  }

  const handleReverse = () => {
    setReversed(!isReversed)
  }

  useEffect(() => {
    setFrameSize(isPlaying ? speed * (!isReversed ? 1 : -1) : 0)
  }, [isPlaying, isReversed, speed])

  return (
    <div className={classList} {...props}>
      <div className={css.data}>
        <div className={css.stat}>
          <span className={css.label}>frame: </span>
          <span className={css.value}>{Math.floor(frame)}</span>
        </div>
      </div>

      <div className={css.actions}>
        <button className={css.button} onClick={handlePlayPause}>
          {isPlaying ? 'pause' : 'play'}
        </button>
        <button className={css.button} onClick={handleSpeed}>{speed}x</button>
        <button className={css.button} onClick={handleReverse}>{!isReversed ? 'forward' : 'reverse'}</button>
        <button className={css.button} onClick={handleReset}>reset</button>
      </div>
    </div>
  )
}
