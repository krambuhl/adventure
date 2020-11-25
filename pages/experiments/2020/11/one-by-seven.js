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
          const slowFrame = absFrame * 0.011
          const slowerFrame = absFrame * 0.01
          const xAbs = x1 - (size / 2)
          const yAbs = y1 - (size / 2)

          const spinFrame1 = Math.sin(slowFrame)
          const spinFrame2 = Math.sin(slowerFrame)
          const clampSpinFrame1 = (spinFrame1 * 0.15) + 1.85
          const clampSpinFrame2 = (spinFrame2 * 0.15) + 1.75

          const group = Math.floor((x + y - 1) / 3)
          const mod = group % 3

          const res = (
            (colors.length - 1) *
            (
              (
                (
                  true
                  // mod > colors.length / 2
                ) ? (
                  clampSpinFrame1 * group + (
                    mod > 4
                      // ? 0.75 * group
                      // : -0.75 * group
                  )
                ) : (
                  clampSpinFrame1 * group
                )
              ) +
              // Math.atan(xAbs * slowFrame) +
              // (Math.atan(yAbs ^ 4)) +
              // (slowFrame) +
              0
            ) +
            Math.random() * 0.05 * colors.length +
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
