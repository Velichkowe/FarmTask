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

    Country: {
        region: async (
            country,
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
                const region = await Region.findByPk(country.regionId);

                return region;
            } catch (err) {
                console.log(err);
            }
        },

        farms: async (
            country,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            try {
                const farms = await Farm.findAll({
                    where: {
                        countryId: country.id
                    }
                });

                return farms;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default countryResolvers;
