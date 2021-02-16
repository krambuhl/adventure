import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-12'
}

const size = 32
const colors = [
  color.Lavender,
  color.Viola,
  // color.BlueVelvet,
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
          const slowFrame = absFrame * 0.1
          const xSlowFrame = (absFrame * 0.1)
          const ySlowFrame = (absFrame * 0.5)
          const xAbs = Math.abs(x - size / 2)
          const yAbs = Math.abs(y - size / 2)

          const res = (
            (slowFrame * Math.atan(size / (xAbs + 1) / (yAbs + 1)) * 1) +
            (slowFrame * Math.atan(size / (yAbs + 1) / (xAbs + 1)) * 10) +
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
