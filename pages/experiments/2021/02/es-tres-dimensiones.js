import React, { useCallback } from 'react'
import { Sketch, Transport, VisualContainer } from 'components'
import { withTransportProvider } from 'contexts'
import { rainbow as colors } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-02-15'
}

function Output () {
  return (
    <VisualContainer>
      <Transport autoplay={false} />
      <Sketch sketch={sketch} />
    </VisualContainer>
  )
}

function sketch (p) {
  let frame = 0
  let frameSize = 1

  p.setup = () => {
    p.createCanvas(600, 600)
    p.frameRate(30)
  }

  p.draw = () => {
    p.background(0)
    p.stroke(255)

    const y = frame % p.height
    p.line(0, y, p.width, y)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.frame !== null) frame = props.frame
    if (props.frameSize !== null) frameSize = props.frameSize
  }
}
