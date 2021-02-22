import { gql } from "@apollo/client";

export const GET_FARMS_BY_USER_COUNTRY_ID = gql`
    query getUserFarms(
        $userId: Int!
        $countryId: Int!
    ) {
        getUserFarms(
            userId: $userId
            countryId: $countryId
        ) {
            id name country {
                name
            }
        }
    }
`;

export const DELETE_FARM_BY_ID = gql`
    mutation deleteFarmById(
        $id: Int!
    ) {
        deleteFarmById (
            id: $id
        ) {
            id
        }
    }
`;

export const ADD_NEW_FARM = gql`
    mutation createNewFarm(
        $name: String!,
        $userId: Int!,
        $countryId: Int!
    ) {
        createNewFarm(
            name: $name,
            userId: $userId,
            countryId: $countryId
        ) {
            name
        }
    }
`;

export const GET_FARMS_BY_USER_ID = gql`
    query getFarmsByUserId(
        $userId: Int!
    ) {
        getFarmsByUserId(
            userId: $userId
        ) {
            id name country {
                name
            }
        }
    }
`;

export const UPDATE_FARM = gql`
    mutation updateFarm(
        $id: Int!
        $name: String!
    ) {
        updateFarm(
            id: $id
            name: $name
        ) {
            name
        }
    }
`;