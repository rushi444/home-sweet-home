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
  error?: string | undefined
  displayLabel?: boolean
}

export const SearchBox: FC<Props> = ({
  onSelectAddress,
  defaultValue,
  error = '',
  displayLabel = true
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
        <FormLabel display={displayLabel ? 'block' : 'none'} htmlFor="search">
          Search for your address
        </FormLabel>
        <ReadySearchBox
          onSelectAddress={onSelectAddress}
          defaultValue={defaultValue}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
