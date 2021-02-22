import { merge } from 'lodash';
import countryResolvers from './countryResolvers';
import regionResolvers from './regionResolver';
import userCountryResolvers from './userCountryResolvers';
import userRegionResolvers from './userRegionResolvers';

export const resolvers = merge(regionResolvers, countryResolvers, userRegionResolvers, userCountryResolvers);
