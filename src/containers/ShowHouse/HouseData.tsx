import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { Image } from 'cloudinary-react'

import {
  ShowHouseQuery,
  ShowHouseQueryVariables
} from 'src/generated/ShowHouseQuery'
import { SHOW_HOUSE_QUERY } from 'src/lib/gql'
import { Layout } from 'src/components/Layout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { SingleMap } from './SingleMap'
import { HouseNav } from './HouseNav'

type Props = {
  id: string
}

export const HouseData: FC<Props> = ({ id }) => {
  const { data, loading } = useQuery<ShowHouseQuery, ShowHouseQueryVariables>(
    SHOW_HOUSE_QUERY,
    { variables: { id } }
  )

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!data?.getHouseById) {
    ;<Layout>
      <Box>House does not exist</Box>
    </Layout>
  }

  const house = data?.getHouseById

  return (
    <Layout>
      <Box display={{ base: 'block', md: 'flex' }}>
        <Box width={{ base: 'full', md: '50%' }} p="1rem">
          <HouseNav house={{id: house?.id, userId: house?.userId}}/>
          <Heading as="h1" size="2xl" my=".5rem" fontFamily="">
            {house?.address}
          </Heading>
          <Image
            style={{ paddingBottom: '.5rem' }}
            publicId={house?.publicId}
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            alt={house?.address}
            secure
            dpr="auto"
            quality="auto"
            width={900}
            height={Math.floor((9 / 16) * 900)}
            crop="fill"
            gravity="auto"
          />
          <Text fontSize="x-large">{house?.bedrooms} 🛏 bedroom house</Text>
        </Box>
        <Box width={{ base: 'full', md: '50%' }}>
          <SingleMap house={house} nearby={house?.nearby}/>
        </Box>
      </Box>
    </Layout>
  )
}
