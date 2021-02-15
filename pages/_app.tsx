import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import { theme } from '../src/lib/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Home Sweet Home</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
