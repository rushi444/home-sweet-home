import { FC, Children } from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Image as CloudinaryImage } from 'cloudinary-react'
import { HousesInRange_housesInRange } from 'src/generated/HousesInRange'

type Props = {
  houses: HousesInRange_housesInRange[]
  setHighlightedId: (arg: string | null) => void
}

export const HouseList: FC<Props> = ({ houses, setHighlightedId }) => {
  return (
    <Box w="50%" pb="1rem" maxH="calc(100vh - 64px)" overflowX="scroll">
      {Children.toArray(
        houses.map(house => (
          <Link href={`/houses/${house.id}`}>
            <Flex
              cursor="pointer"
              wrap="wrap"
              px="1.5rem"
              pt="1rem"
              onMouseEnter={() => setHighlightedId(house.id)}
              onMouseLeave={() => setHighlightedId(null)}
            >
              <Box width={{ base: 'full', md: '50%' }}>
                <CloudinaryImage
                  style={{ margin: 'auto' }}
                  publicId={house?.publicId}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  secure
                  dpr="auto"
                  quality="auto"
                  width={350}
                  height={Math.floor((9 / 16) * 350)}
                  crop="fill"
                  gravity="auto"
                />
              </Box>
              <Box
                w={{ base: 'full', md: '50%' }}
                pl={{ base: '0', md: '2rem' }}
              >
                <Heading as="h2" fontSize="x-large" fontFamily="">
                  {house.address}
                </Heading>
                <Text as="p">{house.bedrooms} 🛏 bedroom house</Text>
              </Box>
            </Flex>
          </Link>
        ))
      )}
    </Box>
  )
}
