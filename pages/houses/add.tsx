import { GetServerSideProps, NextApiRequest } from 'next'

import { Layout } from 'src/components/Layout'
import { loadIdToken } from 'src/lib/auth/firebaseAdmin'
import { AddHome } from 'src/containers/AddHome'

const AddHousePage = () => {
  return (
    <Layout>
      <AddHome />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)
  if (!uid) {
    res.setHeader('location', '/auth')
    res.statusCode = 302
    res.end()
  }

  return { props: {} }
}

export default AddHousePage
