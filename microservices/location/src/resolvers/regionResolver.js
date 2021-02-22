const regionResolvers = {
    Query: {
        regions: async (
            _,
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
                const regions = await Region.findAll();

                return regions;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addRegion: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Region }
                    }
                }
            }
        ) => {
            const { name } = args;

            try {
                const region = await Region.create({
                    name
                });

                return region;
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
        }
    },

    UserRegion: {
        region: async (
            userRegion,
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
                const region = await Region.findByPk(userRegion.regionId);

                return region;
            } catch (err) {
                console.log(err);
            }
        }
    },

    UserCountry: {
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
        }
    }
};

export default regionResolvers;
