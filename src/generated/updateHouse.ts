/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HouseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateHouse
// ====================================================

export interface updateHouse_updateHouse {
  __typename: "House";
  id: string;
  image: string;
  publicId: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  address: string;
}

export interface updateHouse {
  updateHouse: updateHouse_updateHouse | null;
}

export interface updateHouseVariables {
  id: string;
  input: HouseInput;
}
