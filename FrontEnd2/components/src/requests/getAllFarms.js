import { gql, useQuery } from '@apollo/client';

const GET_ALL_USER_FARMS = gql`
    query users {
        users {
            id firstName lastName userId
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