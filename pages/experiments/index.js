import glob from 'fast-glob'
import path from 'path'
import fs from 'fs'
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
                      monthLong,
                      day
                    }) => (
                      <TerminalOption
                        key={url}
                        value={`/experiments/${url}`}
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

export async function getStaticProps() {
  const folder = 'pages/experiments/'
  const files = await glob(`${folder}**/*.js`)

  const titleRe = /.title\s=\s['"]([\S\s]+?)['"]/
  const dateRe = /.date\s=\s['"]([\S\s]+?)['"]/

  const modules = await Promise.all(
    files
      .slice(1)
      .map(file => path.resolve(file))
      .map(file => {
        const fileContents = fs.readFileSync(file, 'utf8')
        const lines = fileContents.split(/\n/).filter(Boolean)

        const filename = file.substr(0, file.indexOf('.js')).substr(file.lastIndexOf('/') + 1)
        const url = file.substr(0, file.indexOf('.js')).substr(file.indexOf('/20') + 1)

        let title = lines.find(l => l.search(titleRe) >= 0)
        let date = lines.find(l => l.search(dateRe) >= 0)

        if (title) {
          title = title.match(titleRe)[1]
        } else {
          title = filename.replace(/-/g, ' ')
        }

        if (date) {
          date = date.match(dateRe)[1]
        } else {
          const res = fs.statSync(file)
          date = res.birthtime.toISOString()
        }

        return {
          title,
          date,
          url
        }
      })
  )

  const projects = reverse(sortBy(
    modules.map((project, id) => {
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
