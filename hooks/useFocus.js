import { useState, useEffect, useRef } from 'react'

export default function useFocus(handle, reqs = []) {
  useEffect(() => {
    document.addEventListener('focus', handle, true)
    return () => document.removeEventListener('focus', handle, true)
  }, reqs)
}
