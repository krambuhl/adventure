import React, { useState, useEffect, useRef } from 'react'

const TransportContext = React.createContext({
  startTime: 0,
  currentTime: 0,
  time: 0,
  setTime: () => {}
})

export function TransportProvider({ children }) {
  const timer = useRef(null)
  const [startTime, setStartTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    setCurrentTime(Date.now())

    timer.current = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000 / 30)

    return () => clearInterval(timer.current)
  }, [])

  return (
    <TransportContext.Provider value={{ startTime, currentTime, time, setTime }}>
      {children}
    </TransportContext.Provider>
  )
}

export default TransportContext
