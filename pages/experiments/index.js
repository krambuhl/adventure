import glob from 'fast-glob'
import path from 'path'
import fs from 'fs'
import djson from 'dirty-json'
import { reverse, sortBy, groupBy } from 'lodash'
import { DateTime } from 'luxon'
import leftpad from 'leftpad'
import { Theme } from 'utils'
import {
  Entry,
  EntryContainer,
  TerminalText,
  TerminalSelect,
  TerminalLabel,
  TerminalOption
} from 'components'

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

  const metaReg = /export\sconst\smeta\s=\s({[\s\S]+?})/gm

  const modules = await Promise.all(
    files
      .slice(1)
      .map(file => path.resolve(file))
      .map(file => {
        const filestats = fs.statSync(file)
        const fileContents = fs.readFileSync(file, 'utf8')

        const pathname = file.substr(0, file.indexOf('.js'))
        const filename = pathname.substr(pathname.lastIndexOf('/') + 1)
        const url = pathname.substr(pathname.indexOf('/20') + 1)

        const res = {
          title: filename.replace(/-/g, ' '),
          date: filestats.birthtime.toISOString(),
          url
        }

        const match = fileContents.match(/export\sconst\smeta\s=\s({[\s\S]+?})/gm)

        if (match) {
          const meta = djson.parse(match[0].match(/({[\s\S]+?})/gm)[0])
          return {
            ...res,
            ...meta
          }
        }

        return res
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
