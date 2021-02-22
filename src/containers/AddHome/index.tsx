import { FC, useState, useEffect } from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

import { SearchBox } from './SearchBox'
import { ImageUpload } from './ImageUpload'
import { HouseDetails } from './HouseDetails'
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation'
import { SIGNATURE_MUTATION } from 'src/lib/gql'
import { uploadImage } from './UploadImageHelper'

type Props = {}

export const AddHome: FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false)
  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  )

  const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>(
    { mode: 'onChange', defaultValues: {} }
  )

  const address = watch('address')

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    const { data: signatureData } = await createSignature()
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature
      const imageData = await uploadImage({
        image: data.image[0],
        signature,
        timestamp
      })
    }
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
      />
      {address?.length && (
        <>
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
        </>
      )}
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