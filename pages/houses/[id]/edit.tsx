import { useRouter } from 'next/router'

import { EditHouseData } from 'src/containers/EditHome/EditHouseData'

const EditHousePage = () => {
  const {
    query: { id }
  } = useRouter()

  if (!id) return null

  return <EditHouseData id={id as string}/>
}



export default EditHousePage
