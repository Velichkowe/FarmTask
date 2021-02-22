import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
    query users {
        users {
            id firstName lastName
            role {
                name
            }
            isApproved
        }
    }
`;

export const getAllUsers = () => {
    const { data } = useQuery(GET_ALL_USERS, {
        fetchPolicy: 'network-only'
    });

    return data;
}