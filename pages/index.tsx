import { Box, Flex } from '@chakra-ui/react'
import { MapBox } from 'src/components/Home/MapBox'
import { Layout } from 'src/components/Layout'
import { HouseList } from 'src/components/Home/HouseList'

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
