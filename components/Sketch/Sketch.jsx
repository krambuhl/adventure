import dynamic from 'next/dynamic'
import { useTransportContext } from 'contexts'
import { useCallback } from 'react'

const SketchWrapper = dynamic(() => import('react-p5-wrapper'), {
  ssr: false,
  loading: () => <div>loading</div>
})

export default function Sketch({
  setup,
  draw
}) {
  const { frame, frameSize } = useTransportContext()

  const sketch = useCallback(
    sketchWrapper({ setup, draw }),
    [setup, draw]
  )

  return (
    <SketchWrapper
      sketch={sketch}
      frame={frame}
      frameSize={frameSize}
    />
  )
}

const sketchWrapper = ({ setup, draw }) => (p) => {
  let frame = 0
  let frameSize = 1

  p.setup = () => {
    p.createCanvas(600, 600)
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
