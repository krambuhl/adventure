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
      <Transport autoplay={true} />
      <Sketch
        draw={(p, { frame }) => {
          const y = frame * 2.5 % p.height
          p.line(0, y, p.width, y)
        }}
      />
    </VisualContainer>
  )
}
