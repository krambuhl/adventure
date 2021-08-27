
import { Sketch, VisualContainer } from 'components'
import { withTransportProvider } from 'contexts'
import { outdoorPaint as color } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-08-19T22:00:00.000Z'
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

const radius = 310
const sizex = radius * 2
const sizey = radius * 2
const count = 2000    

function Output () {
  return (
    <VisualContainer>
      <Sketch
        autoplay
        setup={(p) => {
          p.createCanvas(sizex, sizey, p.WEBGL)
          p.noStroke()
        }}
        draw={(p, { frame }) => {
          p.background('#1C1916')

          for (let i = 0; i <= count; i++) {
            const offset = 5.39
            const slowFrame = frame / 1000 * offset
            const pos = (i * slowFrame) % radius / radius

            // result calculation
            const res = pos * colors.length
            const shape = pos * Math.sin(slowFrame % 1)
            
            // position
            const θ = Math.PI * res
            const r = pos * radius / i + shape
            const zoom = radius * 1
            
            if (isNaN(res)) return {
              backgroundColor: colors[0]
            }

            const x = r * Math.cos(θ) * zoom
            const y = r * Math.sin(θ) * zoom
            const z = ((x * y) + (x + y))
            const rotate =  (x + y) / 100

            // draw
            p.push()
            p.translate(
              x,
              y
            )

            const c = p.color(colors[Math.floor(res % colors.length)])
            p.noStroke()
            p.fill(c)
            p.rotate(rotate)
            p.rect(x, y, z, y / 250)
            p.pop()
          }
        }}
      />
    </VisualContainer>
  )
}
