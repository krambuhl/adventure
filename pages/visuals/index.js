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
          <TerminalOption value="visuals/project">Project A</TerminalOption>
          <TerminalOption value="visuals/project">Project B</TerminalOption>
          <TerminalOption value="visuals/project">Project C</TerminalOption>
          <TerminalOption value="visuals/project">Project D</TerminalOption>
          <TerminalOption value="visuals/project">Project E</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
