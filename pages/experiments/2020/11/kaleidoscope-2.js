import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-13'
}

const size = 32
const colors = [
  color.Lavender,
  color.Viola,
  color.BloodOrange,
  color.Orangina,
  color.YellowCab,
  color.LawnGreen,
  color.Malachite,
  color.SkyBlue,
]

function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={size}
        columns={size}
        cellSize={[`16px`, `16px`]}
        mobileCellSize={[`${90 / size}vw`, `${90 / size}vw`]}
        getCellStyle={({ x, y }) => {
          const absFrame = frame < 0 ? 0 : frame
          const slowFrame = absFrame * 0.01
          const xAbs = x + 1 // Math.abs(x - size / 10)
          const yAbs = y + 1 // Math.abs(y - size / 2)

          const res = (
            (colors.length - 1) * ((xAbs / slowFrame) * Math.atan(yAbs)) +
            // Math.random() * colors.length +
            // (slowFrame * Math.atan(size / (xAbs + 1) / (yAbs + 2)) * 1) +
            // (slowFrame * Math.atan(size / (yAbs + 2) / (xAbs + 1)) * 1) +
            0
          )

          return {
            backgroundColor: colors[Math.floor(res % colors.length)]
          }
        }}
      />
    </VisualContainer>
  )
}
