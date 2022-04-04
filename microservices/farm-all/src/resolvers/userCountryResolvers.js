const userCountryResolvers = {
    Query: {
        userCountries: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { UserCountry }
                    }
                }
            }
        ) => {
            try {
                const userCountries = await UserCountry.findAll();

                return userCountries;
            } catch (err) {
                console.log(err);
            }
        },

        userCountriesByUser_RegionId: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserCountry }
                    }
                }
            }
        ) => {
            const { userId, regionId } = args;

            try {
                const userCountries = await UserCountry.findAll({
                    where: {
                        userId,
                        regionId
                    }
                });
                console.log('userCountries', userCountries);

                return userCountries;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addUserCountry: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserCountry }
                    }
                }
            }
        ) => {
            const { userId, countryId, regionId } = args;
            const errors = {};

            try {
                const checkIfExist = await UserCountry.findOne({
                    where: {
                        userId,
                        countryId,
                        regionId
                    }
                });

                if (checkIfExist) {
                    throw (errors.country = 'Region already assigned !');
                }

                const userCountry = await UserCountry.create({
                    userId,
                    countryId,
                    regionId
                });

                return userCountry;
            } catch (err) {
                console.log(err);

                return null;
            }
        },

        deleteUserCountry: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserCountry }
                    }
                }
            }
        ) => {
            const { userId, countryId } = args;

            try {
                UserCountry.destroy({
                    where: {
                        userId,
                        countryId
                    }
                });
            } catch (err) {
                console.log();
            }
        },

        deleteUserCountryByRegion: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserCountry }
                    }
                }
            }
        ) => {
            const { userId, regionId } = args;

            try {
                UserCountry.destroy({
                    where: {
                        userId,
                        regionId
                    }
                });
            } catch (err) {
                console.log();
            }
        }
    },

    UserCountry: {
        user: async (
            userCountry,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            try {
                const user = await User.findByPk(userCountry.userId);

                return user;
            } catch (err) {
                console.log(err);
            }
        },

        region: async (
            userCountry,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Region }
                    }
                }
            }
        ) => {
            try {
                const region = await Region.findByPk(userCountry.regionId);

                return region;
            } catch (err) {
                console.log(err);
            }
        },

        country: async (
            userCountry,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Country }
                    }
                }
            }
        ) => {
            try {
                const country = await Country.findByPk(userCountry.countryId);

                return country;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default userCountryResolvers;
