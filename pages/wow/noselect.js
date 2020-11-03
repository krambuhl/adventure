import {
  Entry,
  EntryContainer,
  TerminalText
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
      </Entry>
    </EntryContainer>
  )
}
