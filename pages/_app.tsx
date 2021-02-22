import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'

import { AuthProvider } from 'src/lib/auth/useAuth'
import { theme } from 'src/lib/theme'
import { useApollo } from 'src/lib/apollo'

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo()
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Home Sweet Home</title>
        </Head>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
