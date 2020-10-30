import { Theme } from '@utils'
import {
  Entry,
  EntrySet,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

const StrangeBrew = () => import('./strange-brew')

export default function Development() {
  return (
    <EntrySet>
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
          <TerminalOption value="patreon-homepage" label="[PATREON/2020]">patreon homepage</TerminalOption>
          <TerminalOption value={StrangeBrew} label="[BRIGADE/2020]">strange brew stategies</TerminalOption>
          <TerminalOption value="spotify-ad-studio" label="[BRIGADE/2019]">spotify ad studio</TerminalOption>
          <TerminalOption value="tezos-developer-portal" label="[BRIGADE/2019]">tezos developer portal</TerminalOption>
          <TerminalOption value="macfaden-thorpe" label="[SMITH/2019]">macfaden & thorpe</TerminalOption>
          <TerminalOption value="intuit-hackathon" label="[TURN/2018]">intuit hackathon</TerminalOption>
          <TerminalOption value="keysight-technologies" label="[CDX/2016]">keysight techologies</TerminalOption>
          <TerminalOption value="spectrum-health" label="[CDX/2016]">spectrum health</TerminalOption>
          <TerminalOption value="trimet" label="[2015]">trimet.org</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntrySet>
  )
}
