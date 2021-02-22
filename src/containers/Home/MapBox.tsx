import { useRef, useState, FC, Children } from 'react'
import { Box, Button, Heading, Image } from '@chakra-ui/react'
import { Image as CloudinaryImage } from 'cloudinary-react'
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl'
import { useLocalState } from 'src/lib/useLocalState'
import { HousesInRange_housesInRange } from 'src/generated/HousesInRange'
import Link from 'next/link'

type Props = {
  setDataBounds: (bounds: string) => void
  houses: HousesInRange_housesInRange[]
}

export const MapBox: FC<Props> = ({ setDataBounds, houses }) => {
  const [selected, setSelected] = useState<HousesInRange_housesInRange | null>(
    null
  )
  const mapRef = useRef<ReactMapGL | null>(null)

  const [viewPort, setViewPort] = useLocalState<ViewState>('viewport', {
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
          mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
          onLoad={() => {
            if (mapRef.current) {
              const bounds = mapRef.current.getMap().getBounds()
              setDataBounds(JSON.stringify(bounds.toArray()))
            }
          }}
          onInteractionStateChange={extra => {
            if (!extra.isDragging && mapRef.current) {
              const bounds = mapRef.current.getMap().getBounds()
              setDataBounds(JSON.stringify(bounds.toArray()))
            }
          }}
        >
          {Children.toArray(
            houses.map(house => (
              <Marker
                latitude={house.latitude}
                longitude={house.longitude}
                offsetLeft={-15}
                offsetTop={-15}
              >
                <button
                  style={{ width: '30px', height: '30px', fontSize: '30px' }}
                  type="button"
                  onClick={() => setSelected(house)}
                >
                  <Image src="/home-solid.svg" alt="house icon" w="2rem" />
                </button>
              </Marker>
            ))
          )}
          {selected && (
            <Popup
              latitude={selected.latitude}
              longitude={selected.longitude}
              onClose={() => setSelected(null)}
              closeOnClick={false}
            >
              <Box textAlign="center">
                <Heading
                  as="h3"
                  fontSize="x-large"
                  fontFamily=""
                  px="1rem"
                  pb=".5rem"
                >
                  {selected.address.substr(0, 30)}
                </Heading>
                <CloudinaryImage
                  style={{ margin: 'auto' }}
                  publicId={selected?.publicId}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  secure
                  dpr="auto"
                  quality="auto"
                  width={200}
                  height={Math.floor((9 / 16) * 200)}
                  crop="fill"
                  gravity="auto"
                />
                <Link href={`/houses/${selected.id}`}>
                  <Button variant='link' pt='.5rem'>View</Button>
                </Link>
              </Box>
            </Popup>
          )}
        </ReactMapGL>
      </Box>
    </Box>
  )
}
