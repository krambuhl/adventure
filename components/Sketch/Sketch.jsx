import dynamic from 'next/dynamic'
import { useTransportContext } from 'contexts'

const SketchWrapper = dynamic(() => import('react-p5-wrapper'), {
  ssr: false,
  loading: () => <div>loading</div>
})

export default function Sketch({
  sketch
}) {
  const { frame, frameSize } = useTransportContext()

  return (
    <SketchWrapper
      sketch={sketch}
      frame={frame}
      frameSize={frameSize}
    />
  )
}
