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
    }
};

export default regionResolvers;
