import { gql } from '@apollo/client'

export const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`

export const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouseMutation($input: HouseInput!) {
    createHouse(input: $input) {
      id
    }
  }
`

export const SHOW_HOUSE_QUERY = gql`
  query ShowHouseQuery($id: String!) {
    getHouseById(id: $id) {
      id
      userId
      address
      publicId
      bedrooms
      latitude
      longitude
      nearby {
        id
        longitude
        latitude
      }
    }
  }
`

export const HOUSES_IN_RANGE_QUERY = gql`
  query HousesInRange($bounds: BoundsInput!) {
    housesInRange(bounds: $bounds) {
      id
      latitude
      longitude
      address
      publicId
      bedrooms
    }
  }
`
