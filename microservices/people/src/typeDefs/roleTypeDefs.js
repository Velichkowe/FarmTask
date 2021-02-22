import { gql } from 'apollo-server-express';

const roleTypeDefinitions = gql`
    type Role @key(fields: "id") {
        id: ID!
        name: String!
        users: [User]!
    }

    extend type Query {
        role: Role!
        roles: [Role]!
    }
`;

export default roleTypeDefinitions;
