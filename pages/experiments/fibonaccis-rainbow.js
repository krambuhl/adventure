import { useContext } from 'react'
import { VisualContainer } from '@components'
import { TransportContext, TransportProvider } from '@contexts'

function FibonacciRainbow () {
  const { currentTime } = useContext(TransportContext)

  return (
    <VisualContainer>
      <div style={{ textAlign: 'center' }}>
        <p>fibonacci's rainbow</p>
        <p>{currentTime}</p>
      </div>
    </VisualContainer>
  )
}

export default function FibonacciRainbowContainer() {
  return (
    <TransportProvider>
      <FibonacciRainbow />
    </TransportProvider>
  )
}
