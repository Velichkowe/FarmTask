const farmResolvers = {
    Query: {
        farms: async (
            _,
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
                const farms = await Farm.findAll();

                return farms;
            } catch (err) {
                console.log(err);
            }
        },

        getUserFarms: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            const { userId, countryId } = args;

            try {
                const farms = await Farm.findAll({
                    where: {
                        userId,
                        countryId
                    }
                });

                return farms;
            } catch (err) {
                console.log(err);
            }
        },

        getFarmsByUserId: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            const { userId } = args;

            try {
                const farms = await Farm.findAll({
                    where: {
                        userId
                    }
                });

                return farms;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createNewFarm: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            const { name, userId, countryId } = args;

            try {
                const farm = await Farm.create({
                    name,
                    userId,
                    countryId
                });

                return farm;
            } catch (err) {
                console.log(err);
            }
        },

        updateFarm: async (
            _,
            { id, name },
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            try {
                const farm = await Farm.findByPk(id);

                farm.name = name;
                farm.save();
            } catch (err) {
                console.log(err);
            }
        },

        deleteFarmById: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { Farm }
                    }
                }
            }
        ) => {
            try {
                Farm.destroy({
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
            try {
                const farms = await Country.findByPk(farm.id);

                return farms;
            } catch (err) {
                console.log(err);
            }
        },

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

export default farmResolvers;
