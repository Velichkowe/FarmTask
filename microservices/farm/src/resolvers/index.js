import { merge } from 'lodash';
import cropResolvers from './cropResolvers';
import farmResolvers from './farmResolvers';
import fieldResolvers from './fieldResolvers';
import machineResolvers from './machineResolvers';
import machineTypeResolvers from './machineTypeResolvers';
import soilResolvers from './soilResolvers';

export const resolvers = merge(farmResolvers, fieldResolvers, cropResolvers, soilResolvers, machineResolvers, machineTypeResolvers);
