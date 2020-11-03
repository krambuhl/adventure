import {
  EntryContainer,
  Text
} from '@components'
import { Animation } from '@utils'

export default function NotFoundPage() {
  return (
    <EntryContainer>
      <div>
        <Text as="h1" size={Text.lg} weight={Text.bold} className={Animation.blink}>404</Text>
        <Text as="h2" size={Text.md}>Page Not Found</Text>
      </div>
    </EntryContainer>
  )
}
