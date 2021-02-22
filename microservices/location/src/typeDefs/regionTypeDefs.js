import { gql } from 'apollo-server-express';

const regionTypeDefinitions = gql`
    type Region @key(fields: "id") {
        id: ID!
        name: String!
    }

    extend type Country {
        id: ID!
        region: Region
    }

    extend type UserRegion {
        region: Region
    }

    extend type UserCountry {
        region: Region
    }

    extend type Query {
        regions: [Region]
    }

    extend type Mutation {
        addRegion(name: String!): Region
    }
`;

export default regionTypeDefinitions;
