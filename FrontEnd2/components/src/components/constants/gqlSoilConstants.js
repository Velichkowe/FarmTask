import { gql } from "@apollo/client";

export const GET_ALL_SOIL_TYPES = gql`
    query soils {
        soils {
            id name
        }
    }
`;
