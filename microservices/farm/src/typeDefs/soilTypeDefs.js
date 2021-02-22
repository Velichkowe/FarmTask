import { gql } from 'apollo-server-express';

const soilTypeDefinitions = gql`
    type Soil @key(fields: "id") {
        id: ID!
        name: String!
    }

    extend type Field {
        id: ID!
        soil: Soil
    }

    extend type Query {
        soils: [Soil]
    }

    extend type Mutation {
        addSoil(name: String!): Soil
    }
`;

export default soilTypeDefinitions;
