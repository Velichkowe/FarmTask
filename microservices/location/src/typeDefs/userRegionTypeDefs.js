import { gql } from 'apollo-server-express';

const userRegionTypeDefinitions = gql`
    type UserRegion @key(fields: "id") @key(fields: "regionId") @key(fields: "userId") {
        id: ID!
        userId: Int!
        regionId: Int!
    }

    extend type User @key(fields: "id") {
        id: ID! @external
        userRegions: [UserRegion]
    }

    extend type Query {
        userRegions: [UserRegion]
        userRegionsByUserId(userId: Int!): [UserRegion]
    }

    extend type Mutation {
        deleteUserRegion(userId: Int!, regionId: Int!): UserRegion
        addUserRegion(userId: Int!, regionId: Int!): UserRegion
    }
`;

export default userRegionTypeDefinitions;
