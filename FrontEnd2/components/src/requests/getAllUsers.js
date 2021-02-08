import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
    query users {
        users {
            id firstName lastName
        }
    }
`;

export const getAllUsers = () => {
    const { data } = useQuery(GET_ALL_USERS, {
        fetchPolicy: 'network-only'
    });
    console.log('inside',data);

    return data;
}

// export default GET_ALL_USERS;