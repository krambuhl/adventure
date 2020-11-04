import { useContext } from 'react'
import { Transport, VisualContainer } from '@components'
import { TransportContext, TransportProvider } from '@contexts'

function FibonacciRainbow () {
  const { time } = useContext(TransportContext)
  return (
    <VisualContainer>
      <Transport />
      <div>
        snapshot: {time}
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
