import { ChangeEvent, FC, useState } from 'react'
import { Image as CloudinaryImage } from 'cloudinary-react'
import {
  Box,
  FormLabel,
  Input,
  Image,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react'

type Props = {
  error: string | undefined
  register: any
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

export const ImageUpload: FC<Props> = ({ error = '', register, house }) => {
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
  const validateImage = (fileList: FileList) => {
    if (!!house || fileList.length === 1) return true
    return 'Please upload a file'
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
        {previewImage ? (
          <Image src={previewImage} w="576px" h={`${(9 / 16) * 576}px`} />
        ) : house ? (
          <CloudinaryImage
            style={{ marginTop: '1rem' }}
            publicId={house?.publicId}
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            alt={house?.address}
            secure
            dpr="auto"
            quality="auto"
            width={576}
            height={Math.floor((9 / 16) * 576)}
            crop="fill"
            gravity="auto"
          />
        ) : null}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
