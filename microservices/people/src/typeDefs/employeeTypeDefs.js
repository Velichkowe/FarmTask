import { gql } from 'apollo-server-express';

const employeeTypeDefinitions = gql`
    type Employee @key(fields: "id") {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        number: String!
        salary: Int!
        user: User!
    }

    extend type Query {
        employee(id: ID!): Employee!
        employees: [Employee]!
    }
`;

export default employeeTypeDefinitions;
