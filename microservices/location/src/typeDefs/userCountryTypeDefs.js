import { gql } from 'apollo-server-express';

const userCountryTypeDefinitions = gql`
    type UserCountry @key(fields: "countryId") @key(fields: "userId") {
        id: ID!
        name: String!
        userId: Int!
        countryId: Int!
        regionId: Int!
    }

    extend type User @key(fields: "id") {
        id: ID! @external
        userCountries: [UserCountry]
    }

    extend type Query {
        userCountries: [UserCountry]
        userCountriesByUser_RegionId(userId: Int!, regionId: Int!): [UserCountry]
    }

    extend type Mutation {
        addUserCountry(userId: Int!, countryId: Int!, regionId: Int!): UserCountry
        deleteUserCountry(userId: Int!, countryId: Int!): UserCountry
        deleteUserCountryByRegion(userId: Int!, regionId: Int!): UserCountry
    }
`;

export default userCountryTypeDefinitions;
