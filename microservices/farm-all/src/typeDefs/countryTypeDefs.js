import { gql } from 'apollo-server-express';

const countryTypeDefinitions = gql`
    type Country {
        id: ID!
        name: String!
        regionId: Int!
        farms: [Farm]
    }

    extend type UserCountry {
        country: Country
    }

    extend type Query {
        countries: [Country]
        countriesByRegionId(regionId: Int!): [Country]
    }

    extend type Mutation {
        addCountry(name: String!, regionId: Int!): Country
    }
`;

export default countryTypeDefinitions;
