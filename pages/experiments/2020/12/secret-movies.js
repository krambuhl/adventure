import { useEffect } from 'react'
import { Grid, Transport, VisualContainer } from 'components'
import { useTransportContext, withTransportProvider } from 'contexts'
import { secrets as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2020-12-29'
}

const size = 36

const colors = [
  // color.Bone,
  // color.RoyalRed,
  color.Roof,
  color.Roof,
  color.Flesh,
  color.Lilac,
  color.Lilac,
  color.Lavender,
  color.Lavender,
  color.YellowCab,
  color.ShrimpDark,
  color.Shrimp,
  color.ShrimpPastel,
]

function Output () {
  const { frame } = useTransportContext()

  return (
    <VisualContainer>
      <Transport />

      <Grid
        rows={24}
        columns={36}
        cellSize={[`${600 / size}px`, `${600 / size}px`]}
        mobileCellSize={[`${90 / size}vw`, `${135 / size}vw`]}
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
              // (x1 * y1 / (size - 16)) +
              // Math.sin(slowFrame) * Math.sin(x1 * y1) +
              (slowerFrame + Math.sin(x1 & 7.24) + Math.cos(y & 9))
              // 0
              // Math.sin(y0 * slowerFrame) * 4.1 + Math.sin(x0 * slowestFrame) * 4.3
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
