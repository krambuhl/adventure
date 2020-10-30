import {
  Entry,
  EntryContainer,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function Index() {
  return (
    <EntryContainer>
      <Entry>
        <p>You find a peculiar machine while wondering through the world wide web.</p>
      </Entry>

      <Entry type={Entry.action}>
        <p>What do you do:</p>

        <TerminalSelect>
          <TerminalOption value="inspect">inspect the machine</TerminalOption>
          <TerminalOption value="yeet">yeet away</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
