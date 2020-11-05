import { Theme } from '@utils'
import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function VisualExperiments() {
  return (
    <EntryContainer>
      <Entry>
        <p>after pressing the <span className={Theme.action}>visual experiments</span> button, a small screen displays a message:</p>

        <TerminalText>
          <p>i use code to generate data that can be visualized using web technologies.</p>
          <p>some of these experiments are used to inform art in the physical space as <a href="https://www.instagram.com/ev.aart" target="_blank">@ev.aart</a>.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>which experiment do you want to view:</p>

        <TerminalSelect>
          <TerminalOption value="/experiments/fibonaccis-rainbow" label="[2020-11-04]">fibonacci's rainbow</TerminalOption>
          <TerminalOption value="/experiments/fibonaccis-firefighter" label="[2020-11-04]">fibonacci's firefighter</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}

