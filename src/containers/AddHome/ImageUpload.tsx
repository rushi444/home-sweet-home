import { ChangeEvent, FC, useState } from 'react'
import {
  Box,
  FormLabel,
  Input,
  Image,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react'

const validateImage = (fileList: FileList) => {
  if (fileList.length === 1) return true
  return 'Please upload a file'
}

type Props = {
  error: string | undefined
  register: any
}

export const ImageUpload: FC<Props> = ({ error = '', register }) => {
  const [previewImage, setPreviewImage] = useState<string>('')

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box mt="1rem">
      <FormControl isInvalid={!!error}>
        <FormLabel
          htmlFor="image"
          p="1rem"
          border={`.25rem dashed ${!!error ? 'red' : 'gray'}`}
          display="block"
          cursor="pointer"
          w="100%"
        >
          Click to add image (16:9)
        </FormLabel>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          ref={register({ validate: validateImage })}
          onChange={onFileUpload}
          display="none"
        />
        {previewImage && (
          <Image src={previewImage} w="678px" h={`${(9 / 16) * 576}px`} />
        )}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
