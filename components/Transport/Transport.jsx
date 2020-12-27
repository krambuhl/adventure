import { useState, useEffect, useContext } from 'react'
import msTimecode from 'ms-to-timecode'
import classnames from 'classnames'
import { TransportContext } from '@contexts'
import css from './Transport.module.css'

const speeds = [
  0.0001,
  0.001,
  0.01,
  0.1,
  0.25,
  0.5,
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128
]

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
    setSpeed(speeds[Number(ev.target.value)])
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
          <span className={css.value}>{frame.toFixed(4)}</span>
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
            max={speeds.length}
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
