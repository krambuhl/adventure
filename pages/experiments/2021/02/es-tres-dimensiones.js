import { useCallback } from 'react'
import { Transport, VisualContainer } from 'components'
import { withTransportProvider } from 'contexts'
// import { rainbow as colors } from 'data/colorMaps'
// import Sketch from 'react-p5'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-02-15'
}
function Output () {
  const setup = useCallback((p5, parentRef) => {
    p5.createCanvas(600, 600).parent(parentRef)
  })

  const draw = useCallback(() => {

  })

  return (
    <VisualContainer>
      <Transport autoplay={false}/>
      {/* <Sketch setup={setup} draw={draw} /> */}
    </VisualContainer>
  )
}
