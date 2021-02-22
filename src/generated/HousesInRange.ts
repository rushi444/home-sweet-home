/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BoundsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: HousesInRange
// ====================================================

export interface HousesInRange_housesInRange {
  __typename: "House";
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  publicId: string;
  bedrooms: number;
}

export interface HousesInRange {
  housesInRange: HousesInRange_housesInRange[];
}

export interface HousesInRangeVariables {
  bounds?: BoundsInput | null;
}
