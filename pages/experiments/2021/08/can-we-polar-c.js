import { PolarGrid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-08-18T22:00:00.000Z'
}

const colors = [
  color.Lavender,
  color.Orangina,
  color.Viola,
  color.LawnGreen,
  color.SkyBlue,
  color.Malachite,
  color.YellowCab,
  color.BloodOrange,
]

const radius = 300

function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <PolarGrid
        count={200}
        radius={radius}
        getCellStyle={(i, length) => {
          const offset = 5.39
          const slowFrame = frame / 1000 * offset
          const pos = (i * slowFrame) % radius / radius

          // result calculation
          const res = pos * colors.length
          
          // position
          const θ = Math.PI * res
          const r = pos * radius / i
          const zoom = 0.1
          
          if (isNaN(res)) return {
            backgroundColor: colors[0]
          }

          const x = r * Math.cos(θ) * radius * zoom
          const y = r * Math.sin(θ) * radius * zoom
          const z = r * radius

          return {
            margin: '4px',
            borderRadius: 100,
            transform: `
              translate3d(${x}px, ${y}px, ${z}px)
              scale(${r / 1})
            `,
            backgroundColor: colors[
              Math.floor(
                Math.abs(θ + r) %
                colors.length
              )
            ],
          }
        }}
      />
    </VisualContainer>
  )
}
