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
            crop { name }
            soil { name}
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