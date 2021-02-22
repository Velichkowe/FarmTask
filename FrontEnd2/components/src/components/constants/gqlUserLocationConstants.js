import { gql } from "@apollo/client";

export const GET_ALL_USER_REGIONS_BY_USER_ID = gql`
    query userRegionsByUserId(
        $userId: Int!
    ) {
        userRegionsByUserId(
            userId: $userId
        ) {
            region {
                id name
            }
        }
    }
`;

export const GET_USER_COUNTRIES_BY_USER_REGION_ID = gql`
    query userCountriesByUser_RegionId(
        $userId: Int!
        $regionId: Int!
    ) {
        userCountriesByUser_RegionId(
            userId: $userId
            regionId: $regionId
        ) {
            country { 
                id name 
            }
        }
    }
`;