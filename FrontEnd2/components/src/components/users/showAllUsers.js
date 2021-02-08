import React from 'react';

// import getAllUsers from '../../requests/getAllUsers';
import { gql, useQuery } from '@apollo/client';
// import ApolloProvider from '../../apolloProvider/apolloProvider';

const GET_ALL_USERS = gql`
    query users {
        users {
            id firstName lastName
        }
    }
`;

const ShowAllUsers = () => {
    // const data = getAllUsers();
    const { data } = useQuery(GET_ALL_USERS);

    return (
        <div>
            {console.log('Data: ', data)}
            <h1>This is test</h1>
        </div>
        
    )
}

export default ShowAllUsers;