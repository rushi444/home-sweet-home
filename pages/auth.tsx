import { GetServerSideProps, NextApiRequest } from 'next'

import { FirebaseAuth } from 'src/components/FirebaseAuth'
import { Layout } from 'src/components/Layout'
import { loadIdToken } from 'src/lib/auth/firebaseAdmin'

const Auth = () => {
  return (
    <Layout>
      <FirebaseAuth />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (uid) {
    res.setHeader('location', '/')
    res.statusCode = 302
    res.end()
  }

  return { props: {} }
}

export default Auth
