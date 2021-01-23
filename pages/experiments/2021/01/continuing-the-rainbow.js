import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, withTransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-01-22'
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
const steps = Array(7).fill(38)
const offsets = [
  3 * 16,
  3 * 21 + 1,
  3 * 15,
  3 * 6,
  3 * 4 + 2,
  3 * 11 + 2,
  3 * 18
]
const reversed = [false, false, false, false, true, true, true]

function Output () {
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
          const start = offsets[y]
          const isReversed = reversed[y]

          const res = (
            ((start + (x)) * offset) %
            colors.length
          )

          if (isNaN(res)) return {
            backgroundColor: colors[0]
          }

          return {
            margin: '4px 0 0 0',
            backgroundColor: colors[
              Math.floor(
                Math.abs(isReversed ? 38 - res : res) %
                colors.length
              )
            ]
          }
        }}
      />
    </VisualContainer>
  )
}
