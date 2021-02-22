import { Button } from '@chakra-ui/button'
import Link from 'next/link'
import { FC } from 'react'
import { useAuth } from 'src/lib/auth/useAuth'

type Props = {
  house: {
    id?: string
    userId?: string
  }
}

export const HouseNav: FC<Props> = ({ house }) => {
  const { user } = useAuth()
  const canManage = !!user && user.uid === house.userId
  return (
    <>
      <Link href="/">
        <Button variant="link">Map</Button>
      </Link>
      {canManage && (
        <>
          {' | '}
          <Link href={`/houses/${house.id}/edit`}>
            <Button variant="link">Edit</Button>
          </Link>
        </>
      )}
    </>
  )
}
