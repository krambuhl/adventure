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
    setPlaying(false)
    setFrame(0)
  }

  const handleSpeed = (ev) => {
    switch (Number(ev.target.value)) {
      case 0: return setSpeed(0.1)
      case 1: return setSpeed(0.25)
      case 2: return setSpeed(0.5)
      case 3: return setSpeed(1)
      case 4: return setSpeed(2)
      case 5: return setSpeed(4)
      case 6: return setSpeed(8)
      case 7: return setSpeed(16)
      case 8: return setSpeed(32)
      case 9: return setSpeed(64)
      case 10: return setSpeed(128)
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
          <span className={css.value}>{frame.toFixed(2)}</span>
        </div>
      </div>

      <div className={css.actions}>
        <button className={css.button} onClick={handlePlayPause}>
          {isPlaying ? 'pause' : 'play'}
        </button>
        <div className={css.speed}>
          <span>{speed}x</span>
          <input
            type="range"
            list="speed-tickmarks"
            defaultValue={3}
            step={1}
            min={0}
            max={10}
            onChange={handleSpeed}
            onMouseDown={handleSpeed}
          />
        </div>
        <button className={css.button} onClick={handleReverse}>{!isReversed ? 'forward' : 'reverse'}</button>
        <button className={css.button} onClick={handleReset}>reset</button>
      </div>
    </div>
  )
}
