type UploadImage = {
  image: File
  signature: string
  timestamp: number
}

type UploadImageResponse = {
  secure_url: string
}

export const uploadImage = async ({
  image,
  signature,
  timestamp
}: UploadImage): Promise<UploadImageResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  const formdata = new FormData()
  formdata.append('file', image)
  formdata.append('signature', signature)
  formdata.append('timestamp', timestamp.toString())
  formdata.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '')

  const response = await fetch(url, {
    method: 'post',
    body: formdata
  })

  return response.json()
}
