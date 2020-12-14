import { Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'

function fibonacci(num) {
  const list = [0, 1]

  while (list.length < num) {
    const a = list[list.length - 1]
    const b = list[list.length - 2]
    list.push(a + b)
  }

  return list
}

const rows = Array.from({ length: 6 }).map((_, x) => x)
const columns = Array.from({ length: 50 }).map((_, x) => x)

const steps = fibonacci(12)
const stepsRev = fibonacci(12)

const paintColorsMap = {
  Viola: '#A067C3',
  Lavender: '#5A4D9A',
  BlueVelvet: '#361E67',
  // PurpleRed: '#4E1923',
  // RoyalRed: '#7A1A1E',
  // Brick: '#98221E',
  BloodOrange: '#CD361F',
  // FireRed: '#FC5648',
  Orangina: '#F07C31',
  YellowCab: '#E9AC38',
  LawnGreen: '#5B9E47',
  Malachite: '#58BABB',
  // MalachiteDark: '#1D817F',
  SkyBlue: '#1079CB',
  // Fjord: '#244363',
  // DeepSea: '#294056',
}

const paintColors = Object.values(paintColorsMap)

function FibonacciRainbow () {
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
                    const x1 = x + 0
                    const y1 = y + 0
                    const slowFrame = (frame * 0.5)

                    const res = (
                      // (x * 120) +
                      // (y * 8) +
                      steps[Math.floor(x1 / 1) % paintColors.length] +
                      steps[Math.floor(y1 / 1) % paintColors.length] +
                      slowFrame
                    )

                    return (
                      <div
                        key={y}
                        className="cell"
                        style={{
                          backgroundColor: paintColors[Math.floor(res % paintColors.length)]
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
          width: 100%;
        }

        .row {
          display: flex;
          margin-top: 0px;
          justify-content: center;
          width: 100%;
        }

        .cell {
          width: clamp(16px, 2vw, 20px);
          height: clamp(16px, 10vh, 72px);
          background-color: white;
          color: black;
        }

        @media (max-width: 720px) {
          .root {
            flex-flow: row-reverse wrap;
          }

          .row {
            flex-flow: column wrap;
            margin-top: 0;
            margin-left: 0px;
            width: auto
          }

          .cell {
            width: clamp(32px, 10vw, 60px);
            height: clamp(10px, 1.5vh, 14px);
          }
        }
      `}</style>
    </VisualContainer>
  )
}

export default function FibonacciRainbowContainer() {
  return (
    <TransportProvider>
      <FibonacciRainbow />
    </TransportProvider>
  )
}

FibonacciRainbowContainer.fullScreen = true
FibonacciRainbowContainer.date = '2020-11-04'
