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
                name
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
        $maxLiftCap: Int!
        $maxHp: Int!
        $transmission: String!
        $engine: String!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        addMachine(
            name: $name
            maxLiftCap: $maxLiftCap
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
        $grainTankCap: Int!
        $maxHp: Int!
        $maxCutWidth: Float!
        $unloadingSpeed: Int!
        $machineTypeId: Int!
        $farmId: Int!
    ) {
        addMachine(
            name: $name
            grainTankCap: $grainTankCap
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