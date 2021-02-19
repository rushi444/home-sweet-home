import { useRef, useState, FC } from 'react'
import { Box } from '@chakra-ui/react'
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl'

type Props = {}

export const MapBox: FC<Props> = () => {
  const mapRef = useRef<ReactMapGL | null>(null)

  const [viewPort, setViewPort] = useState<ViewState>({
    latitude: 37.773972,
    longitude: -122.431297,
    zoom: 10
  })

  const onViewPortChange = (nextViewPort: ViewState) =>
    setViewPort(nextViewPort)

  return (
    <Box w="50%">
      <Box color="black" position="relative">
        <ReactMapGL
          {...viewPort}
          height="calc(100vh - 64px)"
          width="100%"
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onViewportChange={onViewPortChange}
          ref={instance => (mapRef.current = instance)}
          minZoom={5}
          maxZoom={15}
          mapStyle='mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef'
        ></ReactMapGL>
      </Box>
    </Box>
  )
}
