import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-08-17T22:00:00.000Z'
}

const colors = [
  color.Lavender,
  color.Orangina,
  color.Viola,
  color.LawnGreen,
  color.SkyBlue,
  color.Malachite,
  color.YellowCab,
  color.BloodOrange,
]

const sizex = colors.length * 4 - 1
const sizey = colors.length * 4 - 1


function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={sizey}
        columns={sizex}
        cellSize={[`12px`, `12px`]}
        mobileCellSize={[`3px`, `4px`]}
        getCellStyle={({ x, y }) => {
          const offset = 5.39
          const x0 = x - Math.floor(sizex / 2)
          const y0 = y - Math.floor(sizey / 2)
          const ax = Math.abs(x0) + 1
          const ay = Math.abs(y0) + 1

          const slowFrame = frame / 8 * offset
          const pos = ((Math.tanh(ax / Math.floor(sizex / 2)) * ay) * slowFrame) % sizex / sizex

          const res = pos * colors.length
          const scale = 0.5 + 2 * pos

          if (isNaN(res)) return {
            backgroundColor: colors[0]
          }

          return {
            margin: '4px',
            borderRadius: 100,
            backgroundColor: colors[
              Math.floor(
                Math.abs(res) %
                colors.length
              )
            ],
            transform: `scale(${scale})`
          }
        }}
      />
    </VisualContainer>
  )
}
