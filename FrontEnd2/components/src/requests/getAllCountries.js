import { gql, useQuery } from '@apollo/client';

const USER_COUNTRIES_BY_USER_REGION_ID = gql`
    query countriesByUser_RegionId(
        $userId: Int!
        $regionId: Int!
    ) countriesByUser_RegionId(
        userId: $userId
        regionId: $regionId
    ) {
        country {
            id name
        }
    }
`;

export const getAllCountries = () => {
    const { data } = useQuery(GET_ALL_COUNTRIES, {
        fetchPolicy: 'network-only'
    });

    return data;
}
