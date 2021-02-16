import {
  EntryContainer,
  Text
} from 'components'
import { Animation } from 'styles/utils'

export default function NotFoundPage() {
  return (
    <EntryContainer>
      <Text as="h1" size={Text.lg} weight={Text.bold} className={Animation.blink}>404</Text>
      <Text as="h2" size={Text.md}>Page Not Found</Text>
    </EntryContainer>
  )
}
