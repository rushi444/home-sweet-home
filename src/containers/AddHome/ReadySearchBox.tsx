import { FC, ChangeEvent, Children } from 'react'
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'

import { TAddress } from '.'

const STATUS_OK = 'OK'

type Props = {
  onSelectAddress: (input: TAddress) => void
  defaultValue: string
}

export const ReadySearchBox: FC<Props> = ({
  onSelectAddress,
  defaultValue
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutoComplete({ debounce: 300, defaultValue })

  console.log({ status, data })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value === '') {
      onSelectAddress({ address: '', longitude: null, latitude: null })
    }
  }
  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()
    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      onSelectAddress({ address, latitude: lat, longitude: lng })
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id="search"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search your location"
        style={{ width: '100%', padding: '.5rem', color: 'black' }}
        autoComplete="off"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === STATUS_OK &&
            Children.toArray(
              data.map(({ description }) => (
                <ComboboxOption
                  value={description}
                  style={{ color: 'black' }}
                />
              ))
            )}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

// damn it gitkraken - 2