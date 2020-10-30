import { Theme } from '@utils'
import {
  Entry,
  EntrySet,
  TerminalText
} from '@components'

export default function StrangeBrew() {
  return (
    <EntrySet>
      <Entry>
        <p>You tap on the <span className={Theme.action}>Strange Brew Strategies</span> project and another message begins playing:</p>

        <TerminalText>
          <p>i helped develop a new website for strange brew strategies while working with <a href="http://thebriga.de">the brigade</a> in 2020.</p>
          <p>frontend was built using nextjs and react, content was managed with prismic cms and automatically deployed to vercel while publishing.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>Some images of the project display on the screen:</p>
        <p>[photos]</p>
      </Entry>
    </EntrySet>
  )
}
