import { gql } from 'apollo-server-express';

const employeeTypeDefinitions = gql`
    type Employee {
        id: ID!
        userId: Int!
        firstName: String!
        lastName: String!
        address: String!
        number: String!
        salary: Int!
        user: User!
        email: String!
        roleId: Int!
        role: Role
    }

    type AddEmployeePayload {
        employee: Employee
        errors: String
    }

    extend type Query {
        employee(id: ID!): Employee!
        employees: [Employee]!
        allEmployeesByUserId(userId: Int!): [Employee]
    }

    extend type Mutation {
        addEmployee(
            firstName: String!
            lastName: String!
            address: String!
            number: String!
            salary: Int!
            password: String!
            confirmPassword: String!
            userId: Int!
            email: String!
        ): AddEmployeePayload
        updateEmployee(
            id: ID!
            firstName: String!
            lastName: String!
            email: String!
            address: String!
            number: String!
            salary: Int!
        ): Employee
        deleteEmployee(id: ID!): Int
    }
`;

export default employeeTypeDefinitions;
