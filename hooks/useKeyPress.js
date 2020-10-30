import { useEffect } from 'react'

export default function useKeyPress(handle, reqs = []) {
  useEffect(() => {
    window.addEventListener('keydown', handle)

    return () => {
      window.removeEventListener('keydown', handle)
    }
  }, reqs)
}
