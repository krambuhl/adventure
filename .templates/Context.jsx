import React, { useContext } from 'react'

const Context = React.createContext({

})

export default Context

export function useContext() {
  return useContext(Context)
}

