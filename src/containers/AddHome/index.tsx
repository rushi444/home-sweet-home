import { FC, useState, useEffect } from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { SearchBox } from './SearchBox'
import { ImageUpload } from './ImageUpload'
import { HouseDetails } from './HouseDetails'
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation'
import { CREATE_HOUSE_MUTATION, SIGNATURE_MUTATION } from 'src/lib/gql'
import { uploadImage } from './UploadImageHelper'
import {
  CreateHouseMutation,
  CreateHouseMutationVariables
} from 'src/generated/CreateHouseMutation'

type Props = {}

export const AddHome: FC<Props> = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  )
  const [createHouse] = useMutation<
    CreateHouseMutation,
    CreateHouseMutationVariables
  >(CREATE_HOUSE_MUTATION)

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

      const { data: houseData } = await createHouse({
        variables: {
          input: {
            address: data.address,
            image: imageData.secure_url,
            coordinates: {
              latitude: data.latitude as number,
              longitude: data.longitude as number
            },
            bedrooms: +data.bedrooms
          }
        }
      })

      if (houseData?.createHouse) {
        router.push(`/houses/${houseData.createHouse.id}`)
      }
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
