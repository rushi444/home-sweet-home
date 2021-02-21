import { FC, useState, useEffect } from 'react'
import { Box, FormLabel, Heading, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { SearchBox } from './SearchBox'

type Props = {}

export const AddHome: FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>(
    { defaultValues: {} }
  )

  const address = watch('address')

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    // handle create
  }

  const onSelectAddress = ({ address, latitude, longitude }: TAddress) => {
    setValue('address', address)
    setValue('latitude', latitude)
    setValue('longitude', longitude)
  }

  useEffect(() => {
    register({ name: 'address' }, { required: 'Please enter your address' })
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 })
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 })
  }, [register])
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      mx="auto"
      maxW="36rem"
      py="1rem"
    >
      <Heading as="h1" fontFamily="">
        Add a New House
      </Heading>
      <Box mt="1rem">
        <FormLabel htmlFor="search" display="block">
          Search for your address
        </FormLabel>
        <SearchBox onSelectAddress={onSelectAddress} defaultValue="" />
        <Text>{errors?.address?.message}</Text>
        <Heading as="h2" size="md" mt=".5rem" fontFamily="">
          {address}
        </Heading>
      </Box>
    </Box>
  )
}

type FormData = {
  address: string
  latitude: number | null
  longitude: number | null
  bedrooms: string
  image: FileList
}

export type TAddress = Pick<FormData, 'address' | 'latitude' | 'longitude'>
