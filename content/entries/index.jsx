import {
  Entry,
  EntrySet,
  TerminalSelect,
  TerminalOption
} from '@components'

const Inspect = () => import('./inspect')

export default function Index() {
  return (
    <EntrySet>
      <Entry>
        <p>You find a peculiar machine while wondering through the world wide web.</p>
      </Entry>

      <Entry type={Entry.action}>
        <p>What do you do:</p>

        <TerminalSelect>
          <TerminalOption value={Inspect}>inspect the machine</TerminalOption>
          <TerminalOption value="yeet">yeet away</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntrySet>
  )
}
