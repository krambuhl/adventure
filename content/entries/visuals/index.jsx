import {
  Entry,
  EntrySet,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

const Project = () => import('./project')

export default function Visuals() {
  return (
    <EntrySet>
      <Entry>
        <p>visuals</p>
      </Entry>

      <Entry type={Entry.action}>
        <p>a small screen slides out of hidden compartment and displays a list of projects:</p>

        <TerminalSelect>
          <TerminalOption value={Project}>Project A</TerminalOption>
          <TerminalOption value={Project}>Project B</TerminalOption>
          <TerminalOption value={Project}>Project C</TerminalOption>
          <TerminalOption value={Project}>Project D</TerminalOption>
          <TerminalOption value={Project}>Project E</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntrySet>
  )
}
