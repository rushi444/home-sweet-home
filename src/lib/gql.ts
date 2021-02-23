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

export const EDIT_HOUSE_QUERY = gql`
  query EditHouseQuery($id: String!) {
    getHouseById(id: $id) {
      id
      userId
      address
      image
      publicId
      bedrooms
      latitude
      longitude
    }
  }
`

export const UPDATE_HOUSE_MUTATION = gql`
  mutation updateHouse($id: String!, $input: HouseInput!) {
    updateHouse(id: $id, input: $input) {
      id
      image
      publicId
      latitude
      longitude
      bedrooms
      address
    }
  }
`
