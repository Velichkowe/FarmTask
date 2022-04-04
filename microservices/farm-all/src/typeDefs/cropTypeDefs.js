import { gql } from 'apollo-server-express';

const cropTypeDefinitions = gql`
    type Crop {
        id: ID!
        name: String!
    }

    extend type Field {
        id: ID!
        crop: Crop
    }

    extend type Query {
        crops: [Crop]
    }

    extend type Mutation {
        addCrop(name: String!): Crop
    }
`;

export default cropTypeDefinitions;
