const countryResolvers = {
    Query: {
        countries: async (
            _,
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
                const countries = await Country.findAll();

                return countries;
            } catch (err) {
                console.log(err);
            }
        },

        countriesByRegionId: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Country }
                    }
                }
            }
        ) => {
            const { regionId } = args;

            try {
                const countriesByRegionId = await Country.findAll({
                    where: {
                        regionId
                    }
                });

                return countriesByRegionId;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addCountry: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Country }
                    }
                }
            }
        ) => {
            const { name, regionId } = args;

            try {
                const country = await Country.create({
                    name,
                    regionId
                });

                return country;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Farm: {
        country: async (
            farm,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Country }
                    }
                }
            }
        ) => {
            console.log(farm);
            try {
                const country = await Country.findByPk(farm.countryId);

                return country;
            } catch (err) {
                console.log(err);
            }
        }
    },

    UserCountry: {
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

export default countryResolvers;
