import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation updateUser(
        $id: ID!
        $isApproved: Int!
    ) {
        updateUser(
            id: $id
            isApproved: $isApproved
        ) {
            firstName lastName
        }
    }
`;