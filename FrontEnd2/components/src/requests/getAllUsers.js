import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
    query users {
        users {
            id firstName lastName userId
            role {
                name
            }
            isApproved
            # farms {
            #     name
            # }
            # userRegions {
            #     region {
            #         id name
            #     }
            # }

            # userCountries {
            #     country {
            #         id name
            #     }
            # }
        }
    }
`;

export const getAllUsers = () => {
    const { data } = useQuery(GET_ALL_USERS, {
        fetchPolicy: 'network-only'
    });

    return data;
}