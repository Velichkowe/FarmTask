import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import userTypeDefinitions from './userTypeDefs';
import roleTypeDefinitions from './roleTypeDefs';
import employeeTypeDefinitions from './employeeTypeDefs';

export default gql`
    ${mergeTypes([userTypeDefinitions, roleTypeDefinitions, employeeTypeDefinitions])}
`;
