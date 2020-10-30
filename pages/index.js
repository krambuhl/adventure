import React from 'react'
import { useRouter } from 'next/router'
import { Wrapper } from '@components'
import { Rhythm } from '@utils'
import Index from '@content/entries/index'

export default function IndexPage() {
  const router = useRouter()
  const { pid } = router.query

  return (
    <Wrapper>
      <div className={Rhythm.xl}>
        <Index />
      </div>
    </Wrapper>
  )
}
