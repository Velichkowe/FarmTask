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

    User: {
        farms: async (
            user,
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
                        userId: user.id
                    }
                });

                return farms;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Field: {
        farm: async (
            field,
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
                const farm = Farm.findOne({
                    where: {
                        id: field.farmId
                    }
                });

                return farm;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Machine: {
        farm: async (
            machine,
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
                const farm = await Farm.findOne({
                    where: {
                        id: machine.farmId
                    }
                });

                return farm;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Country: {
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

export default farmResolvers;
