import { Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'

const rows = Array.from({ length: 15 }).map((_, x) => x)
const columns = Array.from({ length: 28 }).map((_, x) => x)

const steps = [1, 1, 2, 3, 5, 8, 13, 21]
const stepsRev = [13, 8, 5, 3, 2, 1, 1]

const colors = [
  '#fd5',
  '#fb4',
  '#f92',
  '#f72',
  '#f51',
  '#f11',
  '#b04',
  '#09f',
  '#0ee',
]

function FibonacciFirefighter () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <div className="root">
        {
          rows.map(x => {
            return (
              <div key={x} className="row">
                {
                  columns.map(y => {
                    const x1 = x + 3
                    const y1 = y + 2
                    const slowFrame = (frame * 0.5)

                    const res = (
                      (x * 120) +
                      (y * 8) +
                      steps[Math.floor(x1 / 1) % steps.length] +
                      stepsRev[Math.floor(y1 / 1) % stepsRev.length] +
                      slowFrame
                    )

                    return (
                      <div
                        key={y}
                        className="cell"
                        style={{
                          backgroundColor: colors[Math.floor(res % colors.length)]
                        }}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>

      <style jsx>{`
        .root {
          display: flex;
          flex-flow: column wrap;
          align-content: center;
          padding: var(--space-md);
        }

        .row {
          display: flex;
        }

        .cell {
          width: clamp(16px, 2vw, 32px);
          height: clamp(16px, 2vw, 32px);
          background-color: white;
          color: black;
        }

        @media (max-width: 720px) {
          .root {

            flex-flow: row-reverse wrap;
          }

          .row {
            flex-flow: column wrap;
          }

          .cell {
            height: max(12px, 2vh);
            width: max(12px, 2vh);
          }
        }
      `}</style>
    </VisualContainer>
  )
}

export default function FibonacciFirefighterContainer() {
  return (
    <TransportProvider>
      <FibonacciFirefighter />
    </TransportProvider>
  )
}

FibonacciFirefighterContainer.fullScreen = true;
FibonacciFirefighterContainer.date = '2020-11-04'
