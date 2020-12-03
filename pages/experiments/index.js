import { reverse, sortBy, groupBy } from 'lodash'
import { DateTime } from 'luxon'
import leftpad from 'leftpad'
import { Theme } from '@utils'
import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalLabel,
  TerminalOption
} from '@components'

export default function VisualExperiments({ projects, projectsByMonth }) {
  return (
    <EntryContainer>
      <Entry>
        <p>after pressing the <span className={Theme.action}>visual experiments</span> button, a small screen displays a message:</p>

        <TerminalText>
          <p>i use code to generate data that can be visualized using web technologies.</p>
          <p>some of these experiments are used to inform art in the physical space as <a href="https://www.instagram.com/ev.aart" target="_blank">@ev.aart</a> on instagram.</p>
        </TerminalText>
      </Entry>

      <Entry type={Entry.action}>
        <p>which experiment do you want to view:</p>

        <TerminalSelect caption={false}>
          {
            Object.keys(projectsByMonth).map(key => {
              return (
                <>
                  <TerminalLabel>{key}</TerminalLabel>

                  <>{
                    projectsByMonth[key].map(({
                      title,
                      url,
                      year,
                      month,
                      monthLong,
                      day
                    }) => (
                      <TerminalOption
                        key={url}
                        value={`/experiments/${year}/${month}/${url}`}
                        label={`${monthLong.substr(0, 3)} ${leftpad(day, 2)}`}
                      >
                        {title}
                      </TerminalOption>
                    ))
                  }</>
                </>
              )
            })
          }
        </TerminalSelect>
      </Entry>
    </EntryContainer>
  )
}

export async function getStaticProps(context) {
  const allProjects = [
    { title: 'fibonacci\'s firefighter', url: 'fibonaccis-firefighter', date: '2020-11-04' },
    { title: 'fibonacci\'s rainbow 1', url: 'fibonaccis-rainbow', date: '2020-11-04' },
    { title: 'fibonacci\'s rainbow 2', url: 'fibonaccis-rainbow-2', date: '2020-11-04' },
    { title: 'fibonacci\'s rainbow 3', url: 'fibonaccis-rainbow-3', date: '2020-11-05' },
    { title: 'spinning square', url: 'spinning-square', date: '2020-11-09' },
    { title: 'warp rainbow', url: 'warp-rainbow', date: '2020-11-10' },
    { title: 'new day rainbow', url: 'new-day-rainbow', date: '2020-11-10' },
    { title: 'kaleidoscope', url: 'kaleidoscope', date: '2020-11-12' },
    { title: 'kaleidoscope', url: 'kaleidoscope-2', date: '2020-11-13' },
    { title: 'dolph in portland', url: 'dolph-in-portland', date: '2020-11-14' },
    { title: 'two-by-four', url: 'two-by-four', date: '2020-11-16' },
    { title: 'one-by-seven', url: 'one-by-seven', date: '2020-11-17' },
    { title: 'one-by-seventeen', url: 'one-by-seventeen', date: '2020-11-17' },
    { title: 'countdown packing', url: 'countdown-packing', date: '2020-11-18' },
    { title: 'sequencing machine', url: 'sequencing-machine', date: '2020-11-24' },
    { title: 'spiral galaxy tv', url: 'spiral-galaxy-tv', date: '2020-11-24' },
    { title: 'turkey tumble', url: 'turkey-tumble', date: '2020-11-26' },
    { title: 'turkey tumble 2', url: 'turkey-tumble-2', date: '2020-11-26' },
    { title: 'campari safari', url: 'campari-safari', date: '2020-11-28' },
    { title: 'late night gnocchi', url: 'late-night-gnocchi', date: '2020-11-30' },
    { title: 'the deco spins', url: 'the-deco-spins', date: '2020-11-30' },
    { title: 'pump and zoom', url: 'pump-and-zoom', date: '2020-12-03' },
    { title: 'spinning target', url: 'spinning-target', date: '2020-12-03' },

  ]

  const projects = reverse(sortBy(
    allProjects.map((project, id) => {
      const { date } = project
      const { year, month, monthLong, weekdayLong, day } = DateTime.fromISO(date)

      return {
        ...project,
        id,
        year,
        month,
        day,
        monthLong,
        weekdayLong
      }
    }),
    ({ date }) => +new Date(date)
  ))

  const projectsByMonth = groupBy(projects, ({ monthLong, year }) => `${monthLong} ${year}`)

  return {
    props: {
      projects,
      projectsByMonth
    }
  }
}
