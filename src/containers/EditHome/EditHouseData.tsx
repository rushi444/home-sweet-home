import { FC } from 'react'
import { useQuery } from '@apollo/client'

import { useAuth } from 'src/lib/auth/useAuth'
import { EDIT_HOUSE_QUERY } from 'src/lib/gql'
import {
  EditHouseQuery,
  EditHouseQueryVariables
} from 'src/generated/EditHouseQuery'
import { Layout } from 'src/components/Layout'
import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextApiRequest } from 'next'
import { loadIdToken } from 'src/lib/auth/firebaseAdmin'
import { AddHome } from '../AddHome'

type Props = {
  id: string
}

export const EditHouseData: FC<Props> = ({ id }) => {
  const { user } = useAuth()

  const { data, loading } = useQuery<EditHouseQuery, EditHouseQueryVariables>(
    EDIT_HOUSE_QUERY,
    { variables: { id } }
  )

  if (!user) {
    return (
      <Layout>
        <Box>Please Login</Box>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    )
  }

  if (data && !data.getHouseById) {
    ;<Layout>
      <Box>House was not found 😔</Box>
    </Layout>
  }

  if (user.uid !== data?.getHouseById?.userId) {
    ;<Layout>
      <Box>You don't have permission 😔</Box>
    </Layout>
  }
  return <Layout><AddHome house={data?.getHouseById}/></Layout>
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const uid = await loadIdToken(req as NextApiRequest)
//   if (!uid) {
//     res.setHeader('location', '/auth')
//     res.statusCode = 302
//     res.end()
//   }
//   return { props: {} }
// }
