import { FC } from 'react'
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script'

import { TAddress } from '.'
import { ReadySearchBox } from './ReadySearchBox'

const libraries: Libraries = ['places']

type Props = {
  onSelectAddress: (input: TAddress) => void
  defaultValue: string
}

export const SearchBox: FC<Props> = ({ onSelectAddress, defaultValue }) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    libraries
  })

  if (!isLoaded) return null
  if (loadError) return <div>Error Loading</div>

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
    />
  )
}
