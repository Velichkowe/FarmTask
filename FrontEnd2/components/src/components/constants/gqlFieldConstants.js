import { gql } from "@apollo/client";

export const GET_ALL_FIELDS_BY_FARM = gql`
    query fieldsByFarmId(
        $farmId: Int!
    ) {
        fieldsByFarmId(
            farmId: $farmId
        ) {
            id
            name
            crop { id name }
            soil { id name}
        }
    }
`;

export const DELETE_FIELD_BY_ID = gql`
    mutation deleteFieldById(
        $id: Int!
    ) {
        deleteFieldById(
            id: $id
        ) {
           name 
        }
    }
`;

export const CREATE_NEW_FIELD = gql`
    mutation addField(
        $name: String!
        $farmId: Int!
        $cropId: Int!
        $soilId: Int!
    ) {
        addField(
            name: $name
            farmId: $farmId
            cropId: $cropId
            soilId: $soilId
        ) {
            id name
        }
    }
`;

export const UPDATE_FIELD = gql`
    mutation updateField(
        $id: Int!
        $name: String!
        $cropId: Int!
        $soilId: Int!
    ) {
        updateField(
            id: $id
            name: $name
            cropId: $cropId
            soilId: $soilId
        ) {
            id name
        }
    }
`;