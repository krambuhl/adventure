import { useState, useEffect, useCallback, useRef } from "react"
import { useRaf } from "rooks"
import { Sketch, VisualContainer } from "components"
import { withTransportProvider } from "contexts"
import { rainbow as colors } from "data/colorMaps"

export default withTransportProvider(Output)
export const meta = {
  date: "2021-09-23T21:00:00.000Z",
}

function useCamera() {
  const cameraRef = useRef()
  const [stream, setStream] = useState(null)

  useEffect(() => {
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ 
          video: {
            width: { ideal: 4096 },
            height: { ideal: 2160 } 
          } 
        })
        .then((stream) => {
          setStream(stream)
        })
    }
  }, [])

  useEffect(() => {
    cameraRef.current.srcObject = stream
    cameraRef.current.play()
  }, [cameraRef, stream])

  return {
    cameraRef,
    stream
  }
}

function useCapture({ cameraRef, width, height, frame }, handle) {
  const canvasRef = useRef()

  useEffect(() => {
    if (canvasRef.current) {
      const camera = cameraRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      const backCanvas = document.createElement('canvas')
      const backContext = backCanvas.getContext('2d')

      backCanvas.width = width
      backCanvas.height = height

      const handlePlay = handle({ camera, canvas, context, backCanvas, backContext, frame })

      camera.addEventListener('play', handlePlay)
      return () => {
        camera.removeEventListener('play', handlePlay)
      }
    }
  }, [cameraRef, canvasRef, frame, handle])
  
  return {
    canvasRef
  }
}

function getColor(data, { i }) {
  // const offset1 = frame % 2 ? 0.001 : 0.0001
  // const cycle = Math.sin(frame / 10)

  return [
    data[i + 0], // - (Math.floor(cycle * 3) * 4)
    data[i + 1], // - (Math.floor(cycle * 31) * 4)
    data[i + 2], // - (Math.floor(cycle * 17) * 4)
    data[i + 3],
  ]
}

function manipulate(backContext, context, w, h, frame) {
  const oldImageData = backContext.getImageData(0, 0, w, h)
  const imageData = new ImageData(w, h)

  console.log(imageData.data.length, 800 * 2 * 600 * 2)

  for (let x = 0; x < 800 * 2; x++) {
    for (let y = 0; y < 600 * 2; y++) {
      const i = x * y
      const [or, og, ob, oa] = getColor(oldImageData.data, { frame, i })
      
      imageData.data[i + 0] = oldImageData.data[i + 0]
      // imageData.data[i + 1] = oldImageData.data[i + 1]
      // imageData.data[i + 2] = oldImageData.data[i + 2]
      imageData.data[i + 3] = oldImageData.data[i + 3]
    }
  }

  // for (let i = 0; i < imageData.data.length; i += 4) {
  //   let x = (i / 4 % w) / w;
  //   let y = Math.ceil(i / 4 / h) / h;
  //   let x1 = x + (w / 2)
  //   let y1 = y + (h / 2)

  //   // const pos = (x + y)
  //   // const offset2 = 1 + Math.cos(frame * x1 * y1 / 100000) * 0.0001
  //   // const offset3 = 1 + Math.sin(frame * x1 * y1 / 100000) * 0.0001

  //   const [or, og, ob, oa] = getColor(oldImageData.data, { i, frame, x, y })

  //   // Modify pixel data
  //   imageData.data[i + 0] = or
  //   imageData.data[i + 1] = og
  //   imageData.data[i + 2] = ob
  //   imageData.data[i + 3] = oa
  // }

  // Draw the pixels onto the visible canvas
  context.putImageData(imageData, 0, 0)
}

function Output() {
  const [width, height] = [800, 600]
  
  const [count, setCount] = useState(3)
  const [frame, setFrame] = useState(0)
  const { cameraRef } = useCamera()

  const [isActive, setActive] = useState(false)
  const [camera, setCamera] = useState(null)
  const [context, setContext] = useState(null)
  const [backContext, setBackContext] = useState(null)

  const draw = useCallback(() => {
    backContext.drawImage(camera, 0, 0, width, height)
    manipulate(backContext, context, width, height, frame)
    setFrame(frame + 1)
  }, [frame, width, height, camera, context, backContext])

  useRaf(draw, isActive)

  // start draw
  const captureCallback = useCallback(({ camera, context, backContext }) => () => {
    setCamera(camera)
    setContext(context)
    setBackContext(backContext)
    setActive(true)
  }, [frame, width, height])

  const { canvasRef } = useCapture({ cameraRef, width, height, frame }, captureCallback)

  return (
    <>
      <VisualContainer> 
        <div>
          <video ref={cameraRef} width={width} />
          <canvas ref={canvasRef} className="canvas" width={width} height={height} />
        </div>
      </VisualContainer>
      <style jsx>{`
        video {
          position: abosolute;
          width: 0;
          visibility: hidden;
        }

        canvas {
          width: 100%;
          max-width: ${width};
          max-height: ${height};
        }
      `}</style>
    </>
  )
}
