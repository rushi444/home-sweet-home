import { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@apollo/client'

import { MapBox } from 'src/containers/Home/MapBox'
import { Layout } from 'src/components/Layout'
import { HouseList } from 'src/containers/Home/HouseList'
import { useLocalState } from 'src/lib/useLocalState'
import { HOUSES_IN_RANGE_QUERY } from 'src/lib/gql'
import {
  HousesInRange,
  HousesInRangeVariables
} from 'src/generated/HousesInRange'
import { useLastData } from 'src/lib/useLastData'

const parseBounds = ({ boundsString }: { boundsString: string }) => {
  const bounds = JSON.parse(boundsString) as BoundsArray
  return {
    sw: { latitude: bounds[0][1], longitude: bounds[0][0] },
    ne: { latitude: bounds[1][1], longitude: bounds[1][0] }
  }
}

type BoundsArray = [[number, number], [number, number]]

const Home = () => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  // need string for local storage and useDebounce shallow compare
  const [dataBounds, setDataBounds] = useLocalState<string>(
    'bounds',
    '[[0 ,0], [0, 0]]'
  )

  const [debouncedDataBounds] = useDebounce(dataBounds, 500)

  const { data, error } = useQuery<HousesInRange, HousesInRangeVariables>(
    HOUSES_IN_RANGE_QUERY,
    {
      variables: { bounds: parseBounds({ boundsString: debouncedDataBounds }) }
    }
  )

  const lastData = useLastData(data)

  if (error) {
    return (
      <Layout>
        <Box>Error loading page...</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Flex>
        <HouseList houses={lastData?.housesInRange || []} setHighlightedId={setHighlightedId}/>
        <MapBox
          setDataBounds={setDataBounds}
          houses={lastData?.housesInRange || []}
          highlightedId={highlightedId}
        />
      </Flex>
    </Layout>
  )
}

export default Home
