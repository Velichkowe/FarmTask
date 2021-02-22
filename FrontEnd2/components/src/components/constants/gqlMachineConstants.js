import { gql } from "@apollo/client";

export const GET_ALL_MACHINES_BY_FARM_ID = gql`
    query machinesByFarmId(
        $farmId: Int!
    ) {
        machinesByFarmId(
            farmId: $farmId
        ) {
            id
            name 
            machineType {
                id name
            }
            farmId          grainTankCapacity
            maxHp           maxCutWidth
            unloadingSpeed  maxLiftCapacity
            transmission    engine
            pickUpWidth     plungerSpeed
        }
    }
`;

export const DELETE_MACHINE = gql`
    mutation deleteMachine(
        $id: Int!
    ) {
        deleteMachine(
            id: $id
        ) {
            id
        }
    }
`;

export const CREATE_NEW_MACHINE_TRAKTOR = gql`
    mutation addMachine(
        $name: String!
        $maxLiftCapacity: Int!
        $maxHp: Int!
        $transmission: String!
        $engine: String!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        addMachine(
            name: $name
            maxLiftCapacity: $maxLiftCapacity
            maxHp: $maxHp
            transmission: $transmission
            engine: $engine
            machineTypeId: $machineTypeId
            farmId: $farmId
        ) {
            id name
        }
    }
`;

export const CREATE_NEW_MACHINE_COMBINE = gql`
    mutation addMachine(
        $name: String!
        $grainTankCapacity: Int!
        $maxHp: Int!
        $maxCutWidth: Float!
        $unloadingSpeed: Int!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        addMachine(
            name: $name
            grainTankCapacity: $grainTankCapacity
            maxHp: $maxHp
            maxCutWidth: $maxCutWidth
            unloadingSpeed: $unloadingSpeed
            machineTypeId: $machineTypeId
            farmId: $farmId
        ) {
            id name
        }
    }
`;

export const CREATE_NEW_MACHINE_BALER = gql`
    mutation addMachine(
        $name: String!
        $pickUpWidth: Int!
        $maxHp: Int!
        $plungerSpeed: Int!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        addMachine(
            name: $name
            pickUpWidth: $pickUpWidth
            maxHp: $maxHp
            plungerSpeed: $plungerSpeed
            machineTypeId: $machineTypeId
            farmId: $farmId
        ) {
            id name
        }
    }
`;

export const UPDATE_MACHINE_COMBINE = gql`
    mutation updateMachine(
        $id: ID!
        $name: String!
        $grainTankCapacity: Int!
        $maxHp: Int!
        $maxCutWidth: Float!
        $unloadingSpeed: Int!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        updateMachine(
            id: $id
            name: $name
            grainTankCapacity: $grainTankCapacity
            maxHp: $maxHp
            maxCutWidth: $maxCutWidth
            unloadingSpeed: $unloadingSpeed
            machineTypeId: $machineTypeId
            farmId: $farmId
        ) {
            name
        }
    }
`;

export const UPDATE_MACHINE_TRAKTOR = gql`
    mutation updateMachine(
        $id: ID!
        $name: String!
        $maxLiftCapacity: Int!
        $maxHp: Int!
        $transmission: String!
        $engine: String!
        $machineTypeId: Int!
        $farmId: Int!
    ) { 
        updateMachine(
            id: $id
            name: $name
            maxLiftCapacity: $maxLiftCapacity
            maxHp: $maxHp
            transmission: $transmission
            engine: $engine
            machineTypeId: $machineTypeId
            farmId: $farmId
        ){
            id name
        }
    }
`;

export const UPDATE_MACHINE_BALER = gql`
    mutation updateMachine(
        $id: ID!
        $name: String!
        $pickUpWidth: Int!
        $maxHp: Int!
        $plungerSpeed: Int!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        updateMachine(
            id: $id
            name: $name
            pickUpWidth: $pickUpWidth
            maxHp: $maxHp
            plungerSpeed: $plungerSpeed
            machineTypeId: $machineTypeId
            farmId: $farmId
        ) {
            id name
        }
    }
`;