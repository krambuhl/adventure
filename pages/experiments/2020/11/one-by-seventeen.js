import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

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
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const x1 = x + 1
          const y1 = y + 1
          const absFrame = Math.max(frame, 0)
          const slowishFrame = absFrame * 0.1
          const slowFrame = absFrame * 0.00031
          const slowerFrame = absFrame * 0.001
          const floorFrame = Math.floor(slowishFrame)
          const xAbs = x1 - (size / 2)
          const yAbs = y1 - (size / 2)

          const spinFrame1 = Math.sin(slowFrame)
          const spinFrame2 = Math.sin(slowerFrame)
          const clampSpinFrame1 = (spinFrame1 * 0.15) + 1.85
          const clampSpinFrame2 = (spinFrame2 * 0.15) + 1.5

          const group = Math.floor((x + y - 1) / 4)
          const mod = group % 4

          const random1 = Math.random() * 0.01 * colors.length
          const random2 = Math.random() * 0.1 * colors.length
          const random3 = Math.random() * 0.5 * colors.length

          const res = (
            (colors.length - 1) *
            (
              (
                (
                  mod > 1
                  // false
                ) ? (
                  clampSpinFrame1 * ((xAbs % 2 ? (yAbs % 2 ? 3 : 4) : 0) + (xAbs * 4))
                ) : (
                  (clampSpinFrame1) * ((yAbs % 2 ? (xAbs % 2 ? 3 : 4) : 0) + (yAbs * 4))
                )
              ) +
              mod +
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
            backgroundColor: colors[0]
          }

          return {
            backgroundColor: colors[Math.floor(Math.abs(res) % colors.length)]
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
OutputContainer.date = '2020-11-17'
