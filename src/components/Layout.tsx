import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const authenticated = false
  const logout = () => null
  return (
    <Box bg="gray.900" mx="auto" maxW="42rem" display="inline">
      <Box as="nav" bg="gray.800" h="64px">
        <Flex px={6} align="center" justify="space-between" h="4rem">
          <Link href="/">
            <Text as="a">
              <Image src="/home-color.svg" alt="home icon" w={6} />
            </Text>
          </Link>
          {authenticated ? (
            <>
              <Link href="/houses/add">
                <Text as="a">Add House</Text>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/auth">
              <a>Login / Signup</a>
            </Link>
          )}
        </Flex>
      </Box>
      <Box as="main" minH="calc(100vh - 64px)">
        {children}
      </Box>
    </Box>
  )
}
