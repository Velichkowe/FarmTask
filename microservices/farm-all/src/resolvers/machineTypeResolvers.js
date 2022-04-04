const machineTypeResolvers = {
    Query: {
        machineTypes: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { MachineType }
                    }
                }
            }
        ) => {
            try {
                const machineTypes = await MachineType.findAll();

                return machineTypes;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addMachineType: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { MachineType }
                    }
                }
            }
        ) => {
            const { name } = args;

            try {
                const machineType = await MachineType.create({
                    name
                });

                return machineType;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default machineTypeResolvers;
