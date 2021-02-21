import { FC } from 'react'
import {
  Box,
  FormLabel,
  Heading,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script'

import { TAddress } from '.'
import { ReadySearchBox } from './ReadySearchBox'

const libraries: Libraries = ['places']

type Props = {
  onSelectAddress: (input: TAddress) => void
  defaultValue: string
  error: string | undefined
  address: string
}

export const SearchBox: FC<Props> = ({
  onSelectAddress,
  defaultValue,
  error = '',
  address
}) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    libraries
  })

  if (!isLoaded) return null
  if (loadError) return <div>Error Loading</div>

  return (
    <Box mt="1rem">
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor="search" display="block">
          Search for your address
        </FormLabel>
        <ReadySearchBox
          onSelectAddress={onSelectAddress}
          defaultValue={defaultValue}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
        <Heading as="h2" size="md" mt=".5rem" fontFamily="">
          {address}
        </Heading>
      </FormControl>
    </Box>
  )
}
