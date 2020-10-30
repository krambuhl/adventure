import {
  Entry,
  EntryContainer,
  TerminalText
} from '@components'


export default function Project() {
  return (
    <EntryContainer>
      <Entry>
        <p>Exercitation velit aliquip cupidatat labore duis nisi sint mollit.</p>

        <TerminalText>
          <p>Mana officia in ea cillum dolore non officia consectetur magna deserunt esse incididunt culpa.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>Some images of the project display on the screen:</p>
        <p>[photos]</p>
      </Entry>
    </EntryContainer>
  )
}
