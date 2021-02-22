import { gql } from 'apollo-server-express';

const machineType_typeDefinitions = gql`
    type MachineType @key(fields: "id") {
        id: ID!
        name: String!
    }

    extend type Machine {
        id: ID!
        machineType: MachineType
    }

    extend type Query {
        machineTypes: [MachineType]
    }

    extend type Mutation {
        addMachineType(name: String!): Machine
    }
`;

export default machineType_typeDefinitions;
