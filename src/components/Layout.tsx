import { FC, ReactNode } from 'react'
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

import { useAuth } from 'src/lib/auth/useAuth'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const { authenticated, logout } = useAuth()

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
              <Button
                onClick={logout}
                variant="ghost"
                _hover={{ backgroundColor: 'black' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Text as="a">Login / Signup</Text>
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
