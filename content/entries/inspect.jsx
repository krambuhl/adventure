import {
  Entry,
  EntrySet,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

const Development = () => import('./development')
const Visuals = () => import('./visuals')

export default function Inspect() {
  return (
    <EntrySet>
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
          <TerminalOption value={Development}>web development</TerminalOption>
          <TerminalOption value={Visuals}>visual experiments</TerminalOption>
          <TerminalOption value="contact">contact me</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntrySet>
  )
}
