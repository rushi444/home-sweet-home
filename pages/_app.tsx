import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import { AuthProvider } from 'src/lib/auth/useAuth'
import { theme } from 'src/lib/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Head>
        <title>Home Sweet Home</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
