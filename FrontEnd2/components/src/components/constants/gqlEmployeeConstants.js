import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
    mutation addEmployee(
        $userId: Int!
        $firstName: String!
        $lastName: String!
        $address: String!
        $number: String!
        $salary: Int!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        addEmployee(
            userId: $userId
            firstName: $firstName
            lastName: $lastName
            address: $address
            number: $number
            salary: $salary
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        ) {
            errors
            employee {
                firstName lastName
            }
        }
    }
`;

export const GET_ALL_EMPLOYEES_BY_USER_ID = gql`
    query allEmployeesByUserId(
        $userId: Int!
    ) {
        allEmployeesByUserId(
            userId: $userId
        ) {
            id
            firstName
            lastName
            email
            address
            number
            salary
        }
    }
`;

export const UPDATE_EMPLOYEE = gql`
    mutation updateEmployee(
        $id: ID!
        $firstName: String!
        $lastName: String!
        $email: String!
        $address: String!
        $number: String!
        $salary: Int!
    ) {
        updateEmployee(
            id: $id
            firstName: $firstName
            lastName: $lastName
            email: $email
            address: $address
            number: $number
            salary: $salary
        ) {
            firstName lastName
        }
    }
`;

export const DELETE_EMPLOYEE = gql`
    mutation deleteEmployee(
        $id: ID!
    ) {
        deleteEmployee(
            id: $id
        )
    }
`;