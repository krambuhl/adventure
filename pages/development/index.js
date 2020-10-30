import { Theme } from '@utils'
import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function Development() {
  return (
    <EntryContainer>
      <Entry>
        <p>after pressing the <span className={Theme.action}>web development</span> button, a loudspeak starts playing a pre-recorded message:</p>

        <TerminalText>
          <p>hello friend!</p>
          <p>you seem to have found my machine...<br />i’m evan krambuhl.</p>
          <p>i’ve been an internet athlete since i was a teenager and enjoy creating interactive experiences with emerging technologies.</p>
          <p>check out some projects that i’ve worked on professionally here, or for other pleasant nonsense, see <a href="#">visual experiments</a>.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>a small screen slides out of hidden compartment and displays a list of projects:</p>

        <TerminalSelect>
          <TerminalOption value="development/patreon-homepage" label="[PATREON/2020]">patreon homepage</TerminalOption>
          <TerminalOption value="development/strange-brew" label="[BRIGADE/2020]">strange brew stategies</TerminalOption>
          <TerminalOption value="development/spotify-ad-studio" label="[BRIGADE/2019]">spotify ad studio</TerminalOption>
          <TerminalOption value="development/tezos-developer-portal" label="[BRIGADE/2019]">tezos developer portal</TerminalOption>
          <TerminalOption value="development/macfaden-thorpe" label="[SMITH/2019]">macfaden & thorpe</TerminalOption>
          <TerminalOption value="development/intuit-hackathon" label="[TURN/2018]">intuit hackathon</TerminalOption>
          <TerminalOption value="development/keysight-technologies" label="[CDX/2016]">keysight techologies</TerminalOption>
          <TerminalOption value="development/spectrum-health" label="[CDX/2016]">spectrum health</TerminalOption>
          <TerminalOption value="development/trimet" label="[2015]">trimet.org</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
