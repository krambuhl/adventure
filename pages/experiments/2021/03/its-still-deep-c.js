
import { Sketch, VisualContainer } from 'components'
import { withTransportProvider } from 'contexts'
import { rainbow as colors } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-04-27T21:00:00.000Z'
}

const [width, height] = [560, 560]
const [stepX, stepY] = [16, 16]
const [sizeX, sizeY] = [
  width / stepX * 1,
  height / stepY * 1
]

let shader

function Output () {
  return (
    <VisualContainer>
      <Sketch
        autoplay
        setup={(p) => {
          p.createCanvas(600, 600, p.WEBGL)
          p.noStroke()

          shader = p.createShader(vs, fs);
        }}
        draw={(p, { frame }) => {
          const absFrame = frame < 0 ? 0 : frame
          const slowFrame = absFrame * 0.001

          p.normalMaterial()
          p.specularMaterial(250)
          p.shader(shader)
          shader.setUniform("uFrameCount", frame);

          for (let x = 0; x < stepX; x++) {
            for (let y = 0; y < stepY; y++) {
              const xAbs = Math.abs(x - stepX / 2)
              const yAbs = Math.abs(y - stepY / 2)

              shader.setUniform("x", x)
              shader.setUniform("xAbs", xAbs)
              shader.setUniform("y", y)
              shader.setUniform("yAbs", yAbs)

              p.push()
              p.translate(
                x * sizeX + (sizeX / 2) - (sizeX * stepX / 2),
                y * sizeY + (sizeY / 2) - (sizeY * stepY / 2)
              )

              p.rotateX(
                (slowFrame * Math.atan(sizeX / (xAbs + 1) / (yAbs + 1)) * 1) 
                // * (xAbs % 2 ? 1 : -1)
              )

              p.rotateY(
                (slowFrame * Math.atan(sizeY / (yAbs + 1) / (xAbs + 1)) * 10)
                // * (yAbs % 2 ? 1 : -1)
              )

              p.rotateZ(
                (slowFrame * Math.atan(sizeY / (yAbs + 1) / (xAbs + 1)) * 0.2) 
                * ((yAbs * yAbs) % 2 > 1 ? 1 : -1)
              )

              // p.rotateY(frame / 1000 * Math.sin((x + 1) * (frame / 100)))
              // p.rotateY(frame / 1000 * Math.sin((y + 1) * (x + 1) * (frame / 1000)))
              // p.rotateX(frame / 1000 * Math.cos((y + 1) * (x + 1) * (frame / 1000)))

              // p.box(sizeX * 0.5, sizeY * 0.5, sizeY * 0.5, 10, 10)
              p.sphere(sizeX * 0.8, 100, 100)
              p.pop()
            }
          }
        }}
      />
    </VisualContainer>
  )
}

const vs = `
  // Get the position attribute of the geometry
  attribute vec3 aPosition;

  // Get the texture coordinate attribute from the geometry
  attribute vec2 aTexCoord;

  // Get the vertex normal attribute from the geometry
  attribute vec3 aNormal;

  // When we use 3d geometry, we need to also use some builtin variables that p5 provides
  // Most 3d engines will provide these variables for you. They are 4x4 matrices that define
  // the camera position / rotation, and the geometry position / rotation / scale
  // There are actually 3 matrices, but two of them have already been combined into a single one
  // This pre combination is an optimization trick so that the vertex shader doesn't have to do as much work

  // uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates
  uniform mat4 uProjectionMatrix;

  // uModelViewMatrix is a combination of the model matrix and the view matrix
  // The model matrix defines the object position / rotation / scale
  // Multiplying uModelMatrix * vec4(aPosition, 1.0) would move the object into it's world position

  // The view matrix defines attributes about the camera, such as focal length and camera position
  // Multiplying uModelViewMatrix * vec4(aPosition, 1.0) would move the object into its world position in front of the camera
  uniform mat4 uModelViewMatrix;

  // Get the framecount uniform
  uniform float uFrameCount;
  uniform float x;
  uniform float xAbs;
  uniform float y;
  uniform float yAbs;

  varying vec2 vTexCoord;
  varying vec3 vNormal;

  void main() {
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 2.0);

    // Frequency and Amplitude will determine the look of the displacement
    float frequency = 1.0;
    float amplitude = 1.;

    // Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
    // You could add more distortions to the other axes too.
    float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);
    positionVec4.x += distortion * ((1.) / 2.01) * aNormal.x * amplitude;
    // positionVec4.y += (distortion * ((yAbs * 1.4) / 1.3)) * aNormal.z * amplitude;
    // positionVec4.z += (distortion * (aNormal.z / 1.3));

    // Send the normal to the fragment shader
    vNormal = aNormal;

    // aTextCoord.x += 0.1;

    // Move our vertex positions into screen space
    // The order of multiplication is always projection * view * model * position
    // In this case model and view have been combined so we just do projection * modelView * position
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

    // Send the texture coordinates to the fragment shader
    vTexCoord = aTexCoord;
  }
`

const fs = `
  precision mediump float;

  varying vec2 vTexCoord;

  // Get the normal from the vertex shader
  varying vec3 vNormal;

  void main() {

    // Normalize the normal
    vec3 color = vNormal * 0.5 + 0.5;

    // Lets just draw the texcoords to the screen
    gl_FragColor = vec4(color, 1.5);
  }
`
