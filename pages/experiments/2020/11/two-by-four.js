import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-11-16'
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

          const res = (
            (colors.length - 1) *
            (
              (
                (
                  ((x + y - 1) % 15) >= 8
                ) ? (
                  clampSpinFrame1 * xAbs
                ) : (
                  clampSpinFrame2 * yAbs
                )
              ) +
              // Math.atan(xAbs * slowFrame) +
              // (Math.atan(yAbs ^ 4)) +
              // (slowFrame) +
              0
            ) +
            // Math.random() * 0.3 * colors.length +
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
