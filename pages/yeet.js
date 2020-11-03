import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalOption
} from '@components'

export default function Yeet() {
  return (
    <EntryContainer>
      <Entry>
        <p>A loud speaker hidden in the bits and bobs starts playing a pre-recordered message:</p>

        <TerminalText audio>
          <p>hello stranger,</p>
          <p>i was really hoping that you'd check this little adventure device out, are you sure you want to go?</p>
          <p>how about reading about my work history in a more traditional format instead, or just say hello.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>what do you want to look at:</p>

        <TerminalSelect>
          <TerminalOption value="/resume">resume</TerminalOption>
          <TerminalOption value="/contact">contact me</TerminalOption>
          <TerminalOption value="/leave">just let me leave</TerminalOption>
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}
