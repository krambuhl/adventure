import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-10'
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
          const absFrame = Math.abs(frame)
          const xSlowFrame = (absFrame * 0.1)
          const ySlowFrame = (absFrame * 0.5)
          const xAbs = Math.abs(x - size / 2)
          const yAbs = Math.abs(y - size / 2)

          const res = (
            (xSlowFrame * (Math.atan(size / 1.7 - xAbs) + 1) * 10) +
            (ySlowFrame * (Math.atan(size / 1.5 - yAbs) + 1) * 0.1) +
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
