import { gql } from 'apollo-server-express';

const fieldTypeDefinitions = gql`
    type Field @key(fields: "id") {
        id: ID!
        name: String!
        farmId: Int!
        cropId: Int!
        soilId: Int!
    }

    extend type Farm {
        id: ID!
        fields: [Field]
    }

    extend type Query {
        fields: [Field]
        fieldsByFarmId(farmId: Int!): [Field]
    }

    extend type Mutation {
        addField(name: String!, farmId: Int!, cropId: Int!, soilId: Int!): Field
        deleteFieldById(id: Int!): Field
        updateField(id: Int!, name: String!, cropId: Int!, soilId: Int!): Field
    }
`;

export default fieldTypeDefinitions;
