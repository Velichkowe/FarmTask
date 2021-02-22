const cropResolvers = {
    Query: {
        crops: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Crop }
                    }
                }
            }
        ) => {
            try {
                const crops = await Crop.findAll();

                return crops;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addCrop: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Crop }
                    }
                }
            }
        ) => {
            const { name } = args;

            try {
                const crop = await Crop.create({
                    name
                });

                return crop;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Field: {
        crop: async (
            field,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Crop }
                    }
                }
            }
        ) => {
            const { cropId } = field;

            try {
                const crop = await Crop.findOne({
                    where: {
                        id: cropId
                    }
                });

                return crop;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default cropResolvers;
