import { useRouter } from 'next/router'
import { HouseData } from 'src/containers/ShowHouse/HouseData'

export const ShowHouse = () => {
  const {
    query: { id }
  } = useRouter()

  if (!id) {
    return null
  }

  return <HouseData id={id as string}/>
}

export default ShowHouse
