/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditHouseQuery
// ====================================================

export interface EditHouseQuery_getHouseById {
  __typename: "House";
  id: string;
  userId: string;
  address: string;
  image: string;
  publicId: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
}

export interface EditHouseQuery {
  getHouseById: EditHouseQuery_getHouseById | null;
}

export interface EditHouseQueryVariables {
  id: string;
}
