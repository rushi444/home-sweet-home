import { FC, useState, useEffect } from 'react'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { SearchBox } from './SearchBox'
import { ImageUpload } from './ImageUpload'
import { HouseDetails } from './HouseDetails'

type Props = {}

export const AddHome: FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>(
    { mode: 'onChange', defaultValues: {} }
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
      <SearchBox
        onSelectAddress={onSelectAddress}
        defaultValue=""
        error={errors?.address?.message}
        address={address}
      />
      <ImageUpload error={errors?.image?.message} register={register} />
      <HouseDetails error={errors?.bedrooms?.message} register={register} />
      <Flex>
        <Button
          type="submit"
          disabled={submitting}
          mt="1rem"
          colorScheme="blue"
        >
          Add Listing
        </Button>
        <Button mt="1rem" variant="link" color="white" ml="1rem">
          <Link href="/">Cancel</Link>
        </Button>
      </Flex>
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
