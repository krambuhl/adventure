import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

const size = 32
const colors = [
  // color.Lavender,
  // color.Viola,
  // color.BlueVelvet,
  color.BloodOrange,
  color.Orangina,
  color.YellowCab,
  // color.White,
  // color.LawnGreen,
  // color.Malachite,
  // color.SkyBlue,
]

const colors2 = [
  color.Lavender,
  // color.Viola,
  // color.Black,
  // color.BloodOrange,
  // color.Orangina,
  // color.YellowCab,
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
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const x1 = x + 1
          const y1 = y + 1
          const absFrame = Math.min(Math.max(frame, 0), Infinity)
          const slowFrame = absFrame * 0.031
          const xAbs = x1 - (size / 2)
          const yAbs = y1 - (size / 2)

          // const random1 = Math.random() * 0.01
          // const random2 = Math.random() * 0.1
          // const random3 = Math.random() * 0.5

          const spinFrame1 = Math.sin(slowFrame) * 1 + 1
          const spinFrame2 = Math.sin(slowFrame) * 1 + 1
          const spinFrame3 = slowFrame % 1 / 1
          const clampSpinFrame1 = (frame / 12 * 0.25) + 0
          const clampSpinFrame2 = (frame / 12 * 0.25) + 0

          let group = Math.floor(xAbs * yAbs * slowFrame) % 2

          const colorSet = group ? colors : colors2
          const res = (
            (colors.length - 1) *
            (
              (
                true ? (
                  spinFrame3 * y1
                ) : (
                  spinFrame3 * x1
                )
              ) +
              // Math.atan(xAbs * slowFrame) +
              // (Math.atan(yAbs ^ 4)) +
              // (slowFrame) +
              0
            ) +
            // Math.random() * 0.01 * colors.length +
            // (slowFrame * Math.atan(size / (xAbs + 1) / (yAbs + 2)) * 1) +
            // (slowFrame * Math.atan(size / (yAbs + 2) / (xAbs + 1)) * 1) +
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
