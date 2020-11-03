import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function Inspect() {
  return (
    <EntryContainer>
      <Entry>
        <p>On closer inspection, you find a hand engraved sign that reads:</p>

        <TerminalText>
          <p>
            programmer for hire, $90/hr<br />
            press button for information
          </p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>Below are three buttons:</p>

        <TerminalSelect>
          <TerminalOption value="/development">web development</TerminalOption>
          <TerminalOption value="/experiments">visual experiments</TerminalOption>
          <TerminalOption value="/contact">contact me</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
