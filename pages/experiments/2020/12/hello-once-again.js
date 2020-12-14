import { Grid, Transport, VisualContainer } from '@components'
import { useTransportContext, TransportProvider } from '@contexts'
import { outdoorPaint as color } from '@data/colorMaps'

const size = 33

const colors = [
  color.Lavender,
  color.Viola,
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
        cellSize={[`15.5px`, `15.5px`]}
        mobileCellSize={[`${100 / size}%`, `12px`]}
        getCellStyle={({ x, y }) => {
          const x1 = x + 1
          const y1 = y + 1
          const x0 = x1 - (size / 2)
          const y0 = y1 - (size / 2)

          const slowFrame = frame * 0.2
          const slowerFrame = frame * 0.015
          const slowestFrame = frame * 0.001

          const res = (
            (colors.length - 1) *
            (
              // (Math.sin(x0 * slowestFrame) * Math.cos(y0 * slowerFrame)) *
              x0 / y0 *
              slowestFrame *
              colors.length
            ) +
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

OutputContainer.fullScreen = true
OutputContainer.date = '2020-12-14'
