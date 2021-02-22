import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import countryTypeDefinitions from './countryTypeDefs';
import regionTypeDefinitions from './regionTypeDefs';
import userCountryTypeDefinitions from './userCountryTypeDefs';
import userRegionTypeDefinitions from './userRegionTypeDefs';

export default gql`
    ${mergeTypes([regionTypeDefinitions, countryTypeDefinitions, userRegionTypeDefinitions, userCountryTypeDefinitions])}
`;
