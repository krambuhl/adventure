import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, withTransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-26'
}

const size = 32
const colors = [
  color.Malachite,
  color.MalachiteDark,
  color.SkyBlue,
  color.DeepSea,
]

const colors2 = [
  color.PurpleRed,
  color.RoyalRed,
  color.Brick,
  color.BloodOrange,
  color.PurpleRed,
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
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const x1 = x + 1
          const y1 = y + 1
          const absFrame = Math.min(Math.max(frame, 0), Infinity)
          const slowFrame = absFrame * 0.001
          const slowerFrame = absFrame * 0.05
          const slowestFrame = absFrame * 0.005
          const slowestFrame2 = absFrame * 0.0005
          const xAbs = x1 - (size / 2)
          const yAbs = y1 - (size / 2)

          // const spinFrame1 = slowFrame % 2 < 1 ? 1 + (0.01 * slowFrame) : 1 + (0.02 * slowFrame)
          // const spinFrame2 = slowFrame % 2 < 1 ? 1 : 2

          let group = Math.floor(xAbs > yAbs + (slowFrame)) % 4

          // const colorSet = Math.sin(xAbs * yAbs) > absFrame % 4 ? colors : colors2
          const flag1 = Math.sin(x1 * slowFrame) + Math.cos(y1 * slowFrame)
          const colorSet = flag1 > Math.sin(slowerFrame) * 2 ? colors : colors2

          const res = (
            (colors.length - 1) *
            (
              flag1
                ? Math.sin(x1 - 6) * Math.cos(y1 - 6) + slowestFrame
                : Math.sin(x1 - 6) * Math.cos(y1 - 6) + slowestFrame
            ) +
            // Math.random() * 0.01 * colors.length +
            0
          )

          if (isNaN(res)) return {
            backgroundColor: colorSet[0]
          }

          return {
            backgroundColor: colorSet[Math.floor(Math.abs(res) % colorSet.length)]
          }
        }}
      />
    </VisualContainer>
  )
}
