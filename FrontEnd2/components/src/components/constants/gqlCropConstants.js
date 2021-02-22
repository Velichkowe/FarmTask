import { gql } from "@apollo/client";

export const GET_ALL_CROPS = gql`
    query crops {
        crops {
            id name
        }
    }
`;
