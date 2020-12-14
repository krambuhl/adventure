import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

const size = 33
const colors = [
  color.Malachite,
  color.MalachiteDark,
  color.MalachiteDark,
  color.MalachiteDark,
  color.SkyBlue,
  color.SkyBlue,
  color.DeepSea,
  color.DeepSea,
]

const colors2 = [
  color.BloodOrange,
  color.RoyalRed,
  color.RoyalRed,
  color.PurpleRed,
  color.PurpleRed,
  color.Brick,
  color.Brick,
  color.Brick,
]

function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={size}
        columns={size}
        cellSize={[`15.5px`, `15.5px`]}
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const x1 = x + 1
          const y1 = y + 1
          const x0 = x1 - (size / 2)
          const y0 = y1 - (size / 2)
          const xAbs = Math.abs(x0)
          const yAbs = Math.abs(y0)

          const slowFrame = frame * 0.1
          const slowerFrame = frame * 0.01
          const slowestFrame = frame * 0.001

          const grid = 8
          const beak = grid / 2


          // const flag1 = (
          //   // ((yAbs % grid < beak) || (yAbs + 1 % grid < beak))
          //   ((xAbs % grid < beak) || ((xAbs + 2) % grid < beak))
          // )

          let flag1 = Math.sin(slowestFrame * x0 * y0) > 0

          const colorSet = flag1 ? colors : colors2

          const res = (
            (colors.length - 1) *
            (
              (x0 * y0) *
              (Math.sign(x0 * y0) * slowestFrame) +
              0
            ) +
            (
              // xAbs % 5 ? 0 + xAbs : 2 * xAbs +
              // yAbs % 7 ? 0 + xAbs : 1 * yAbs +
              0
            ) +
            (
              0
            ) +
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

export default function OutputContainer() {
  return (
    <TransportProvider>
      <Output />
    </TransportProvider>
  )
}

OutputContainer.fullScreen = true;
OutputContainer.date = '2020-11-28'