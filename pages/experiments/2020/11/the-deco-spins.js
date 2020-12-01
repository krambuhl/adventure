import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

const size = 33

const colors = [
  color.Malachite,
  color.MalachiteDark,
  color.MalachiteDark,
  color.DeepSea,
  color.DeepSea,
  color.SkyBlue,
  color.SkyBlue,
  color.SkyBlue,
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
          const slowerFrame = frame * 0.015
          const slowestFrame = frame * 0.001

          const grid = 8
          const beak = grid / 2

          let flag1 = (
            Math.sin(slowerFrame * y0 + (x0 * 0.05)) >
            Math.cos(slowerFrame * x0)
          )

          const colorSet = flag1 ? colors : colors2

          const res = (
            (colors.length - 1) *
            (
              Math.sin(slowerFrame * y0 + (x0 * 0.15)) +
              Math.cos(slowerFrame * x0) +
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
