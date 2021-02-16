import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from 'components'

export default function Inspect() {
  return (
    <EntryContainer>
      <Entry>
        <p>On closer inspection, you find a hand engraved sign that reads:</p>

        <TerminalText>
          <p>programmer for hire</p>
          <p>press button for information</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>Below are three buttons:</p>

        <TerminalSelect>
          <TerminalOption value="/development">web development</TerminalOption>
          <TerminalOption value="/experiments">visual experiments</TerminalOption>
          <TerminalOption value="mailto://evan@kram.codes">contact me</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
