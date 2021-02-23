import { gql } from 'apollo-server-express';

const userTypeDefinitions = gql`
    type User @key(fields: "id") {
        id: ID!
        firstName: String!
        lastName: String!
        password: String!
        email: String!
        confirmPassword: String!
        employees: [Employee]!
        role: Role!
        isApproved: Int!
    }

    type LoginPayload {
        token: String!
        errors: String
    }

    type RegisterPayload {
        user: User
        errors: String
    }

    type LoggedUserPayload {
        id: ID!
        firstName: String
        lastName: String
        email: String
        roleId: Int
        userId: Int
    }

    extend type UserRegion @key(fields: "userId") {
        userId: Int! @external
        user: User
    }

    extend type UserCountry @key(fields: "userId") {
        userId: Int! @external
        user: User
    }

    extend type Query {
        user(id: ID!): User!
        users: [User]!
        getLoggedUser: LoggedUserPayload
    }

    extend type Mutation {
        register(firstName: String!, lastName: String!, email: String!, password: String!, confirmPassword: String!): RegisterPayload
        login(email: String!, password: String!): LoginPayload
        updateUser(id: ID!, isApproved: Int!): User
    }
`;

export default userTypeDefinitions;
