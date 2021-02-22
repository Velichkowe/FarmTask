import { merge } from 'lodash';
import UserResolvers from './userResolvers';
import RoleResolvers from './roleResolvers';
import EmployeeResolvers from './employeeResolvers';

export const resolvers = merge(UserResolvers, RoleResolvers, EmployeeResolvers);
