const machineResolvers = {
    Query: {
        machines: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Machine }
                    }
                }
            }
        ) => {
            try {
                const machines = await Machine.findAll();

                return machines;
            } catch (err) {
                console.log(err);
            }
        },

        machinesByFarmId: async (
            _,
            { farmId },
            {
                dataSources: {
                    sequelize: {
                        models: { Machine }
                    }
                }
            }
        ) => {
            try {
                const machines = await Machine.findAll({
                    where: {
                        farmId
                    }
                });

                return machines;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addMachine: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Machine }
                    }
                }
            }
        ) => {
            const {
                name,
                machineTypeId,
                farmId,
                grainTankCapacity,
                maxHp,
                maxCutWidth,
                unloadingSpeed,
                maxLiftCapacity,
                transmission,
                engine,
                pickUpWidth,
                plungerSpeed
            } = args;

            console.log(args);

            try {
                const machine = await Machine.create({
                    name,
                    machineTypeId,
                    farmId,
                    grainTankCapacity,
                    maxHp,
                    maxCutWidth,
                    unloadingSpeed,
                    maxLiftCapacity,
                    transmission,
                    engine,
                    pickUpWidth,
                    plungerSpeed
                });

                return machine;
            } catch (err) {
                console.log(err);
            }
        },

        updateMachine: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Machine }
                    }
                }
            }
        ) => {
            const {
                id,
                name,
                machineTypeId,
                farmId,
                grainTankCapacity,
                maxHp,
                maxCutWidth,
                unloadingSpeed,
                maxLiftCapacity,
                transmission,
                engine,
                pickUpWidth,
                plungerSpeed
            } = args;

            try {
                Machine.destroy({
                    where: {
                        id
                    }
                });

                const machine = await Machine.create({
                    name,
                    machineTypeId,
                    farmId,
                    grainTankCapacity,
                    maxHp,
                    maxCutWidth,
                    unloadingSpeed,
                    maxLiftCapacity,
                    transmission,
                    engine,
                    pickUpWidth,
                    plungerSpeed
                });

                return machine;
            } catch (err) {
                console.log(err);

                return null;
            }
        },

        deleteMachine: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { Machine }
                    }
                }
            }
        ) => {
            try {
                Machine.destroy({
                    where: {
                        id
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    Machine: {
        machineType: async (
            machine,
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
                const machineType = await MachineType.findOne({
                    where: {
                        id: machine.machineTypeId
                    }
                });

                return machineType;
            } catch (err) {
                console.log(err);
            }
        },

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
    }
};

export default machineResolvers;
