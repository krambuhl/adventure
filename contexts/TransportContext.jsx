import React, { useContext, useState } from 'react'
import { useInterval } from 'hooks'

const TransportContext = React.createContext({
  frame: 0,
  setFrame: () => {},
  frameSize: 1,
  setFrameSize: () => {}
})

export default TransportContext

export function useTransportContext() {
  return useContext(TransportContext)
}

export function TransportProvider({ children }) {
  const [frame, setFrame] = useState(0)
  const [frameSize, setFrameSize] = useState(1)

  useInterval(() => {
    setFrame(frame + frameSize)
  }, 1000 / 30)

  return (
    <TransportContext.Provider value={{
      frame,
      setFrame,
      frameSize,
      setFrameSize,
    }}>
      {children}
    </TransportContext.Provider>
  )
}

export function withTransportProvider(Children) {
  return function TransportContainer() {
    return (
      <TransportProvider>
        <Children />
      </TransportProvider>
    )
  }
}
