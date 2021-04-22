import { useState, useEffect, useContext, useRef } from 'react'
import { reverse } from 'lodash'
import { BiPause, BiPlay, BiStop } from 'react-icons/bi';
import classnames from 'classnames'
import { TransportContext } from 'contexts'
import css from './Transport.module.css'

const speeds = [
  0.00001, 0.0001, 0.001, 0.01, 0.1, 0.25, 0.5,
  1, 2, 4, 8, 16, 32, 64, 128
]

const allSpeeds = [
  ...reverse(speeds).map(speed => parseFloat(speed)).map(speed => speed * -1),
  ...reverse(speeds).map(speed => parseFloat(speed))
]

export default function Transport({
  autoplay = true,
  initialSpeed = 1,
  initialFrame = 0,
  className,
  ...props
}) {
  const [isPlaying, setPlaying] = useState(autoplay)
  const [speed, setSpeed] = useState(initialSpeed)
  const { frame, setFrame, setFrameSize } = useContext(TransportContext)
  const classList = classnames(css.root, className)
  const ref = useRef()

  const handlePlayPause = () => {
    setPlaying(!isPlaying)
  }

  const handleStop = () => {
    setPlaying(false)
    setFrame(0)
  }

  const handleChange = (ev) => {
    setSpeed(allSpeeds[Number(ev.target.value)])
    ev.preventDefault()
  }

  const handleInput = (ev) => {
    setSpeed(allSpeeds[Number(ev.target.value)])
  }

  const handleKeyboard = (ev) => {
    if (ev.keyCode === 32) {
      setPlaying(!isPlaying)
    }

    if (ev.keyCode === 37) {
      const next = allSpeeds.indexOf(speed) - 1
      setSpeed(allSpeeds[Math.max(next, 0)])
    }

    if (ev.keyCode === 39) {
      const next = allSpeeds.indexOf(speed) + 1
      setSpeed(allSpeeds[Math.min(next, allSpeeds.length - 1)])
    }
  }

  const handleKeyboardCancel = (ev) => {
    if (ev.keyCode === 32 || ev.keyCode === 37 || ev.keyCode === 39) {
      ev.stopPropagation()
    }
  }

  useEffect(() => {
    setFrame(initialFrame)
  }, [initialFrame])

  useEffect(() => {
    setFrameSize(isPlaying ? speed : 0)
  }, [isPlaying, speed])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [isPlaying, allSpeeds, speed])

  return (
    <div
      className={classList}
      {...props}
    >
      <div className={css.data}>
        <div className={css.stat}>
          <span className={css.label}>frame: </span>
          <span className={css.value}>{frame.toFixed(4)}</span>
        </div>
      </div>

      <div className={css.actions}>
        <div className={css.speed}>
          <div className={css.speedWrap}>
            <input
              ref={ref}
              type="range"
              list="speed-tickmarks"
              value={allSpeeds.indexOf(speed)}
              step={1}
              min={0}
              max={allSpeeds.length - 1}
              onChange={handleChange}
              onInput={handleInput}
              onKeyDown={handleKeyboardCancel}
              className={css.speedInput}
            />
            <span
              className={css.speedLabel}
              style={{
                '--progress': allSpeeds.indexOf(speed) / (allSpeeds.length - 1)
              }}
            >
              frame size: {speed}
            </span>
          </div>
        </div>
        <button
          className={css.button}
          onClick={handlePlayPause}
          onKeyDown={handleKeyboardCancel}
        >
          {isPlaying ? <BiPause /> : <BiPlay />}
        </button>
        <button
          className={css.button}
          onClick={handleStop}
          onKeyDown={handleKeyboardCancel}
        >
          <BiStop />
        </button>
      </div>
    </div>
  )
}
