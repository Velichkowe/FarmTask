const soilResolvers = {
    Query: {
        soils: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Soil }
                    }
                }
            }
        ) => {
            try {
                const soils = await Soil.findAll();

                return soils;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addSoil: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Soil }
                    }
                }
            }
        ) => {
            const { name } = args;

            try {
                const soil = await Soil.create({
                    name
                });

                return soil;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Field: {
        soil: async (
            field,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Soil }
                    }
                }
            }
        ) => {
            const { soilId } = field;

            try {
                const soil = await Soil.findOne({
                    where: {
                        id: soilId
                    }
                });

                return soil;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default soilResolvers;
