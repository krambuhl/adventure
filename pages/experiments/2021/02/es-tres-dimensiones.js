
import { Sketch, VisualContainer } from 'components'
import { withTransportProvider } from 'contexts'
import { rainbow as colors } from 'data/colorMaps'

export default withTransportProvider(Output)
export const meta = {
  date: '2021-02-15'
}

const [width, height] = [600, 600]
const [stepX, stepY] = [40, 40]
const [sizeX, sizeY] = [
  width / stepX,
  height / stepY
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
          // const y = (frame % p.height) * 2.5

          p.normalMaterial()
          p.specularMaterial(250)
          p.shader(shader)
          shader.setUniform("uFrameCount", frame);

          for (let x = 0; x <= stepX; x++) {
            for (let y = 0; y <= stepY; y++) {
              p.push()
              p.translate(
                x * sizeX + (sizeX / 2) - (sizeX * stepX / 2),
                y * sizeY + (sizeY / 2) - (sizeY * stepY / 2)
              )

              shader.setUniform("x", x);
              shader.setUniform("y", y);

              p.rotateY(frame / 1000 * x)
              p.rotateX(frame / 1000 * (y + 1))

              p.sphere(sizeX * 0.5)
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
  uniform float y;

  varying vec2 vTexCoord;
  varying vec3 vNormal;

  void main() {
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);

    // Frequency and Amplitude will determine the look of the displacement
    float frequency = 2.0;
    float amplitude = 0.4;

    // Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
    // You could add more distortions to the other axes too.
    float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);
    positionVec4.x += distortion * ((x + 1.) / 4.01) * aNormal.y * amplitude;
    positionVec4.y += (distortion * ((y + 1.) / 2.3)) * aNormal.y * amplitude;

    // Send the normal to the fragment shader
    vNormal = aNormal;


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
