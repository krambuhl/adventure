import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, withTransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-10'
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

function FibonacciRainbow () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={size}
        columns={size}
        cellSize={[`16px`, `16px`]}
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const absFrame = Math.abs(frame)
          const xSlowFrame = (absFrame * 0.001)
          const ySlowFrame = (absFrame * 0.003)
          const xAbs = Math.abs(x - size / 2)
          const yAbs = Math.abs(y - size / 2)

          const res = (
            (xSlowFrame * (Math.atan(xAbs) + 1) * 3.4) +
            (ySlowFrame * (Math.atan(yAbs) + 1) * 11.8) +
            (Math.random() * 0.25) +
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
