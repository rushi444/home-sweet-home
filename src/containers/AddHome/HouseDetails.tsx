import { FC } from 'react'
import {
  Box,
  FormLabel,
  Input,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react'

type Props = {
  register: any
  error: string | undefined
}

export const HouseDetails: FC<Props> = ({ register, error = '' }) => {
  return (
    <Box mt="1rem">
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor="bedrooms" display="block">
          Beds
        </FormLabel>
        <Input
          id="bedrooms"
          name="bedrooms"
          type="number"
          p=".5rem"
          color="black"
          bg="white"
          ref={register({
            required: 'Please enter the number of bedrooms',
            max: {
              value: 20,
              message: 'Woaah, is that a house or a compound?'
            },
            min: { value: 0, message: 'Invalid' }
          })}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
