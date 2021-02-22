import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import cropTypeDefinitions from './cropTypeDefs';
import farmTypeDefinitions from './farmTypeDefs';
import fieldTypeDefinitions from './fieldTypeDefs';
import soilTypeDefinitions from './soilTypeDefs';
import machineTypeDefinitions from './machineTypeDefs';
import machineType_typeDefinitions from './machineType_typeDefs';

export default gql`
    ${mergeTypes([
        farmTypeDefinitions,
        fieldTypeDefinitions,
        cropTypeDefinitions,
        soilTypeDefinitions,
        machineTypeDefinitions,
        machineType_typeDefinitions
    ])}
`;
