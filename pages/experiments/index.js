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
          <p>some of these experiments are used to inform art in the physical space as <a href="https://www.instagram.com/ev.aart" target="_blank">@ev.aart</a> on instagram.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>which experiment do you want to view:</p>

        <TerminalSelect>
          <TerminalOption value="/experiments/one-by-seventeen" label="[2020-11-17]">one-by-seventeen</TerminalOption>
          <TerminalOption value="/experiments/one-by-seven" label="[2020-11-17]">one-by-seven</TerminalOption>
          <TerminalOption value="/experiments/two-by-four" label="[2020-11-16]">two-by-four</TerminalOption>
          <TerminalOption value="/experiments/dolph-in-portland" label="[2020-11-14]">dolph in portland</TerminalOption>
          <TerminalOption value="/experiments/kaleidoscope-2" label="[2020-11-13]">kaleidoscope</TerminalOption>
          <TerminalOption value="/experiments/kaleidoscope" label="[2020-11-12]">kaleidoscope</TerminalOption>
          <TerminalOption value="/experiments/new-day-rainbow" label="[2020-11-10]">new day rainbow</TerminalOption>
          <TerminalOption value="/experiments/warp-rainbow" label="[2020-11-10]">warp rainbow</TerminalOption>
          <TerminalOption value="/experiments/spinning-square" label="[2020-11-9]">spinning square</TerminalOption>
          <TerminalOption value="/experiments/fibonaccis-rainbow-3" label="[2020-11-05]">fibonacci's rainbow 3</TerminalOption>
          <TerminalOption value="/experiments/fibonaccis-rainbow-2" label="[2020-11-04]">fibonacci's rainbow 2</TerminalOption>
          <TerminalOption value="/experiments/fibonaccis-rainbow" label="[2020-11-04]">fibonacci's rainbow 1</TerminalOption>
          <TerminalOption value="/experiments/fibonaccis-firefighter" label="[2020-11-04]">fibonacci's firefighter</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}

