import { gql } from 'apollo-server-express';

const userRegionTypeDefinitions = gql`
    type UserRegion {
        id: ID!
        userId: Int!
        regionId: Int!
        user: User!
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
