import { Box, Flex } from '@chakra-ui/react'
import { MapBox } from 'src/containers/Home/MapBox'
import { Layout } from 'src/components/Layout'
import { HouseList } from 'src/containers/Home/HouseList'

const Home = () => {
  return (
    <Layout>
      <Flex>
        <HouseList />
        <MapBox />
      </Flex>
    </Layout>
  )
}

export default Home
