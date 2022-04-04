import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import cropTypeDefinitions from './cropTypeDefs';
import farmTypeDefinitions from './farmTypeDefs';
import fieldTypeDefinitions from './fieldTypeDefs';
import soilTypeDefinitions from './soilTypeDefs';
import machineTypeDefinitions from './machineTypeDefs';
import machineType_typeDefinitions from './machineType_typeDefs';
import countryTypeDefinitions from './countryTypeDefs';
import regionTypeDefinitions from './regionTypeDefs';
import userCountryTypeDefinitions from './userCountryTypeDefs';
import userRegionTypeDefinitions from './userRegionTypeDefs';
import userTypeDefinitions from './userTypeDefs';
import roleTypeDefinitions from './roleTypeDefs';
import employeeTypeDefinitions from './employeeTypeDefs';

export default gql`
    ${mergeTypes([
        farmTypeDefinitions,
        fieldTypeDefinitions,
        cropTypeDefinitions,
        soilTypeDefinitions,
        machineTypeDefinitions,
        machineType_typeDefinitions,
        regionTypeDefinitions,
        countryTypeDefinitions,
        userRegionTypeDefinitions,
        userCountryTypeDefinitions,
        userTypeDefinitions,
        roleTypeDefinitions,
        employeeTypeDefinitions
    ])}
`;
