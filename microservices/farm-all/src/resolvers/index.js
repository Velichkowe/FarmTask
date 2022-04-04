import { merge } from 'lodash';
import cropResolvers from './cropResolvers';
import farmResolvers from './farmResolvers';
import fieldResolvers from './fieldResolvers';
import machineResolvers from './machineResolvers';
import machineTypeResolvers from './machineTypeResolvers';
import soilResolvers from './soilResolvers';
import countryResolvers from './countryResolvers';
import regionResolvers from './regionResolver';
import userCountryResolvers from './userCountryResolvers';
import userRegionResolvers from './userRegionResolvers';
import UserResolvers from './userResolvers';
import RoleResolvers from './roleResolvers';
import EmployeeResolvers from './employeeResolvers';

export const resolvers = merge(
    farmResolvers,
    fieldResolvers,
    cropResolvers,
    soilResolvers,
    machineResolvers,
    machineTypeResolvers,
    regionResolvers,
    countryResolvers,
    userRegionResolvers,
    userCountryResolvers,
    UserResolvers,
    RoleResolvers,
    EmployeeResolvers
);
