import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, withTransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-12-03'
}


const sizex = 52
const sizey = 7

const colors = [
  color.Lavender,
  color.Orangina,
  color.Viola,
  color.SkyBlue,
  color.LawnGreen,
  color.Malachite,
  color.YellowCab,
  color.BloodOrange,
]

// const steps = fibonacci(12)
// const steps = [52, 52, 52, 52, 40, 32, 32, 24, 24, 16, 16, 8, 8]
// const steps = [52, 48, 48, 40, 40, 32, 32, 24, 24, 16, 16, 8, 8]
const steps = Array(7).fill(52)

function getColor(x, y, offset = 5.395) {
  const start = steps.slice(0, x)
    .reduce((sum, size, i) => (
      i % offset > 2 ? sum + (size / 2) : sum
    ), Math.sin(frame) * 100)
  return (
    ((start + y + x + 0) * offset) %
    colors.length
  )
}

function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={sizey}
        columns={sizex}
        cellSize={[`16px`, `60px`]}
        mobileCellSize={[`48px`, `12px`]}
        getCellStyle={({ x, y }) => {
          const offset = 5.394
          const start = (
            steps
              .slice(0, y)
              .reduce((sum, size, i) => {
                return sum + (i % 3 == 0 ? size * 1.199 : size * 1.142)
              }, 0)
          )

          const res = (
            ((start + x) * offset) %
            colors.length
          )

          if (isNaN(res)) return {
            backgroundColor: colors[0]
          }

          return {
            // margin: '2px 0 0 0',
            backgroundColor: colors[
              Math.floor(
                Math.abs(res) %
                colors.length
              )
            ]
          }
        }}
      />
    </VisualContainer>
  )
}
