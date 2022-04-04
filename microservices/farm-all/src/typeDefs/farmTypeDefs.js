import { gql } from 'apollo-server-express';

const farmTypeDefinitions = gql`
    type Farm {
        id: ID!
        name: String!
        userId: Int!
        countryId: Int!
        country: Country
        fields: [Field]
    }

    extend type Field {
        id: ID!
        farm: Farm
    }

    extend type Machine {
        id: ID!
        farm: Farm
    }

    extend type Query {
        farms: [Farm]
        getUserFarms(userId: Int!, countryId: Int!): [Farm]
        getFarmsByUserId(userId: Int!): [Farm]
    }

    extend type Mutation {
        createNewFarm(name: String!, userId: Int!, countryId: Int!): Farm
        deleteFarmById(id: Int!): Farm
        updateFarm(id: Int!, name: String!): Farm
    }
`;

export default farmTypeDefinitions;
