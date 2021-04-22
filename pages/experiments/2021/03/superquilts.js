import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-03-10'
}

const size = 38 * 2
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
      <Transport
        autoplay={false}
        initialFrame={80000}
      />

      <Grid
        rows={size}
        columns={size}
        cellSize={[`8px`, `8px`]}
        mobileCellSize={[`${90 / size}vw`, `${90 / size}vw`]}
        getCellStyle={({ x, y }) => {
          const absFrame = frame < 0 ? 0 : frame
          const slowFrame = absFrame * 0.2
          const slowerFrame = absFrame * 0.015
          const slowestFrame = absFrame * 0.001

          const xAbs = Math.abs(x - size / 2)
          const yAbs = Math.abs(y - size / 2)
          const x1 = x + 1
          const y1 = y + 1

          const res = (
            // (slowFrame * Math.atan(size / (xAbs + 1) / (yAbs + 1)) * 1) +
            // (slowFrame * Math.atan(size / (yAbs + 1) / (xAbs + 1)) * 10) +
            // xAbs * yAbs +
            (y1 * slowerFrame) * 2.1 + Math.sin(x1 * slowestFrame) + (slowestFrame ^ (x1 + y1)) +
            0
          )

          return {

            backgroundColor: colors[Math.floor(Math.abs(res) % colors.length)],
            marginBottom: `${yAbs % 10 === 0 ? yAbs === 0 ? 0 : 0 : 0}px`,
            marginLeft: `${xAbs % 10 === 0 ? xAbs === 0 ? 0 : 0 : 0}px`,
          }
        }}
      />
    </VisualContainer>
  )
}
