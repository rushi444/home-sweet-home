import { FC, useState, useEffect } from 'react'
import { Box, FormLabel, Heading } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

type FormData = {
  address: string
  latitude: number
  longitude: number
  bedrooms: string
  image: FileList
}

type Props = {}

export const AddHome: FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>(
    { defaultValues: {} }
  )

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    // handle create
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
      </Box>
    </Box>
  )
}
// young based god