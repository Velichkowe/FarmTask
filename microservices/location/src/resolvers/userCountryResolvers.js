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

    User: {
        userCountries: async (
            user,
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
                const userCountries = await UserCountry.findAll({
                    where: {
                        userId: user.id
                    }
                });

                return userCountries;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default userCountryResolvers;
