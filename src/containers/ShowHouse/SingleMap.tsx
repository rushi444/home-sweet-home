import { Children, FC, useState } from 'react'
import Link from 'next/link'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box, Image } from '@chakra-ui/react'

type THouse = {
  id: string
  latitude: number
  longitude: number
}

type Props = {
  house: THouse | undefined | null
  nearby: THouse[] | undefined | null
}

export const SingleMap: FC<Props> = ({ house, nearby }) => {
  const [viewport, setViewport] = useState({
    latitude: house?.latitude,
    longitude: house?.longitude,
    zoom: 13
  })

  const onViewportChange = (nextViewport: typeof viewport) => {
    setViewport(nextViewport)
  }

  return (
    <Box>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px"
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
        scrollZoom={false}
        minZoom={8}
      >
        <Box pos="absolute" top="0" left="0" p="1rem">
          <NavigationControl showCompass={false} />
        </Box>
        <Marker
          latitude={house?.latitude as number}
          longitude={house?.longitude as number}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button
            type="button"
            style={{ width: '30px', height: '30px', fontSize: '30px' }}
          >
            <Image src="/home-color.svg" alt="selected house" w={8} />
          </button>
        </Marker>
        {Children.toArray(
          nearby?.map(near => (
            <Marker
              latitude={near.latitude}
              longitude={near.longitude}
              offsetLeft={-15}
              offsetTop={-15}
            >
              <Link href={`/houses/${near.id}`}>
                <a
                  type="button"
                  style={{ width: '30px', height: '30px', fontSize: '30px' }}
                >
                  <Image src="/home-solid.svg" alt="nearby house" w={8} />
                </a>
              </Link>
            </Marker>
          ))
        )}
      </ReactMapGL>
    </Box>
  )
}
