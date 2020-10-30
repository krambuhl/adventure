import React from 'react'
import { useRouter } from 'next/router'
import { Wrapper } from '@components'
import { Rhythm } from '@utils'
import entries from '@content/entriesHash'
import Index from '@content/entries/index'

export default function EntryPage() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Wrapper>
      <div className={Rhythm.xl}>
        {
          slug && slug.map(slugPart => {
            const Component = React.lazy(entries[slugPart])

            return (
              <React.Suspense>
                <Component />
              </React.Suspense>
            )
          })
        }
      </div>
    </Wrapper>
  )
}
