import { gql } from 'apollo-server-express';

const countryTypeDefinitions = gql`
    type Country @key(fields: "id") {
        id: ID!
        name: String!
        regionId: Int!
    }

    extend type Farm @key(fields: "countryId") {
        countryId: Int! @external
        country: Country
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
