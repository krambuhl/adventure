import {
  Entry,
  EntryContainer,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function Visuals() {
  return (
    <EntryContainer>
      <Entry>
        <p>visuals</p>
      </Entry>

      <Entry type={Entry.action}>
        <p>a small screen slides out of hidden compartment and displays a list of projects:</p>

        <TerminalSelect>
          <TerminalOption value="/experiments/project">Project</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
