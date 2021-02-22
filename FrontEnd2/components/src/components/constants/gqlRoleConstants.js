import { gql } from "@apollo/client";

export const GET_ROLE_BY_ID = gql`
    query getRoleById(
        $id: ID!
    ) {
        getRoleById(
            id: $id
        ) {
            id name
        }
    }
`;