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
import {
  CREATE_HOUSE_MUTATION,
  SIGNATURE_MUTATION,
  UPDATE_HOUSE_MUTATION
} from 'src/lib/gql'
import { uploadImage } from './UploadImageHelper'
import {
  CreateHouseMutation,
  CreateHouseMutationVariables
} from 'src/generated/CreateHouseMutation'
import {
  updateHouseVariables,
  updateHouse as updateHouseT
} from 'src/generated/updateHouse'

type Props = {
  house?: {
    id: string
    address: string
    latitude: number
    longitude: number
    bedrooms: number
    image: string
    publicId: string
  } | null
}

export const AddHome: FC<Props> = ({ house }) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  )
  const [createHouse] = useMutation<
    CreateHouseMutation,
    CreateHouseMutationVariables
  >(CREATE_HOUSE_MUTATION)

  const [updateHouse, { error }] = useMutation<
    updateHouseT,
    updateHouseVariables
  >(UPDATE_HOUSE_MUTATION)

  const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>(
    {
      mode: 'onChange',
      defaultValues: house
        ? {
            address: house.address,
            latitude: house.latitude,
            longitude: house.longitude,
            bedrooms: house.bedrooms.toString()
          }
        : {}
    }
  )

  const address = watch('address')

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    if (!!house) {
      console.log('updating')
      await handleUpdate(house, data)
    } else {
      console.log('adding')
      await handleCreate(data)
    }
    setSubmitting(false)
    console.log('Successful')
  }

  const handleCreate = async (data: FormData) => {
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

  const handleUpdate = async (currentHouse: typeof house, data: FormData) => {
    let image = currentHouse?.image

    if (data.image[0]) {
      const { data: signatureData } = await createSignature()
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature
        const imageData = await uploadImage({
          image: data.image[0],
          signature,
          timestamp
        })
        image = imageData.secure_url
      }
    }

    const { data: houseData } = await updateHouse({
      variables: {
        id: currentHouse?.id || '',
        input: {
          address: data.address,
          image: image || '',
          coordinates: {
            latitude: data.latitude || 0,
            longitude: data.longitude || 0
          },
          bedrooms: +data.bedrooms
        }
      }
    })

    if (houseData?.updateHouse) {
      router.push(`/houses/${house?.id}`)
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
        {house ? `Editing ${house.address}` : 'Add a New House'}
      </Heading>
      <SearchBox
        onSelectAddress={onSelectAddress}
        defaultValue={house ? house.address : ''}
        error={errors?.address?.message}
      />
      {address?.length && (
        <>
          <ImageUpload
            error={errors?.image?.message}
            register={register}
            house={house}
          />
          <HouseDetails error={errors?.bedrooms?.message} register={register} />
          <Flex>
            <Button
              type="submit"
              disabled={submitting}
              mt="1rem"
              colorScheme="blue"
            >
              {house ? 'Edit Listing' : 'Add Listing'}
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
