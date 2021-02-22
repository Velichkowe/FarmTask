const fieldResolvers = {
    Query: {
        fields: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            try {
                const fields = await Field.findAll();

                console.log(fields);

                return fields;
            } catch (err) {
                console.log(err);
            }
        },

        fieldsByFarmId: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            const { farmId } = args;

            try {
                const fields = await Field.findAll({
                    where: {
                        farmId
                    }
                });

                return fields;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addField: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            const { name, farmId, cropId, soilId } = args;

            try {
                const field = await Field.create({
                    name,
                    farmId,
                    cropId,
                    soilId
                });

                return field;
            } catch (err) {
                console.log(err);
            }
        },

        updateField: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            const { id, name, cropId, soilId } = args;

            try {
                const field = await Field.findByPk(id);
                field.name = name;
                field.cropId = cropId;
                field.soilId = soilId;
                await field.save();

                return field;
            } catch (err) {
                console.log(err);

                return null;
            }
        },

        deleteFieldById: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            try {
                Field.destroy({
                    where: {
                        id
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    Farm: {
        fields: async (
            farm,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Field }
                    }
                }
            }
        ) => {
            try {
                const fields = await Field.findAll({
                    where: {
                        farmId: farm.id
                    }
                });

                return fields;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default fieldResolvers;
