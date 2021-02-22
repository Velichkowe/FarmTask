import { gql, useQuery } from '@apollo/client';

const GET_ALL_REGIONS = gql`
    query regions {
        regions {
            id name
        }
    }
`;

export const getAllRegions = () => {
    const { data } = useQuery(GET_ALL_REGIONS, {
        fetchPolicy: 'network-only'
    });

    return data;
}