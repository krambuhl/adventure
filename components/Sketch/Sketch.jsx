import dynamic from 'next/dynamic'
import { Transport } from 'components'
import { useTransportContext } from 'contexts'
import { useCallback, useState } from 'react'

const SketchWrapper = dynamic(() => import('react-p5-wrapper'), {
  ssr: false,
  loading: () => <div>loading</div>
})

export default function Sketch({
  autoplay,
  setup,
  draw
}) {
  const { frame, frameSize, setFrameSize } = useTransportContext()

  const wrappedSetup = useCallback((p) => {
    setup && setup(p)
    autoplay && setFrameSize(1)
  }, [setup, setFrameSize])

  const sketch = useCallback(
    sketchWrapper({ setup: wrappedSetup, draw }),
    [setup, draw]
  )

  return (
    <>
      <Transport autoplay={false} />
      <SketchWrapper
        sketch={sketch}
        frame={frame}
        frameSize={frameSize}
      />
    </>
  )
}

const sketchWrapper = ({ setup, draw }) => (p) => {
  let frame = 0
  let frameSize = 1

  p.setup = () => {
    p.frameRate(60)
    setup && setup(p)
  }

  p.draw = () => {
    p.background(0)
    p.stroke(255)
    draw && draw(p, { frame, frameSize })
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.frame !== null) frame = props.frame
    if (props.frameSize !== null) frameSize = props.frameSize
  }
}
