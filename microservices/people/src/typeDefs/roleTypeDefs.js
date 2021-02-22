import { gql } from 'apollo-server-express';

const roleTypeDefinitions = gql`
    type Role @key(fields: "id") {
        id: ID!
        name: String!
        users: [User]!
    }

    extend type Query {
        role: Role!
        getRoleById(id: ID!): Role
        roles: [Role]!
    }
`;

export default roleTypeDefinitions;
