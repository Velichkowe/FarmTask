import { gql } from 'apollo-server-express';

const machineTypeDefinitions = gql`
    type Machine {
        id: ID!
        name: String!
        machineTypeId: Int!
        farmId: Int!
        grainTankCapacity: Int
        maxHp: Int
        maxCutWidth: Float
        unloadingSpeed: Int
        maxLiftCapacity: Int
        transmission: String
        engine: String
        pickUpWidth: Int
        plungerSpeed: Int
        machineType: MachineType
        farm: Farm
    }

    extend type Query {
        machines: [Machine]
        machinesByFarmId(farmId: Int!): [Machine]
    }

    extend type Mutation {
        addMachine(
            name: String!
            machineTypeId: Int!
            farmId: Int!
            grainTankCapacity: Int
            maxHp: Int
            maxCutWidth: Float
            unloadingSpeed: Int
            maxLiftCapacity: Int
            transmission: String
            engine: String
            pickUpWidth: Int
            plungerSpeed: Int
        ): Machine
        deleteMachine(id: Int!): Machine
        updateMachine(
            id: ID!
            name: String!
            machineTypeId: Int!
            farmId: Int!
            grainTankCapacity: Int
            maxHp: Int
            maxCutWidth: Float
            unloadingSpeed: Int
            maxLiftCapacity: Int
            transmission: String
            engine: String
            pickUpWidth: Int
            plungerSpeed: Int
        ): Machine
    }
`;

export default machineTypeDefinitions;
