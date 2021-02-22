/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShowHouseQuery
// ====================================================

export interface ShowHouseQuery_getHouseById_nearby {
  __typename: "House";
  id: string;
  longitude: number;
  latitude: number;
}

export interface ShowHouseQuery_getHouseById {
  __typename: "House";
  id: string;
  userId: string;
  address: string;
  publicId: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
  nearby: ShowHouseQuery_getHouseById_nearby[];
}

export interface ShowHouseQuery {
  getHouseById: ShowHouseQuery_getHouseById | null;
}

export interface ShowHouseQueryVariables {
  id: string;
}
