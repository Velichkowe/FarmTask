const userRegionResolvers = {
    Query: {
        userRegions: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { UserRegion }
                    }
                }
            }
        ) => {
            try {
                const userRegions = await UserRegion.findAll();

                return userRegions;
            } catch (err) {
                console.log(err);
            }
        },

        userRegionsByUserId: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserRegion }
                    }
                }
            }
        ) => {
            const { userId } = args;
            console.log('userIddddd', userId);

            try {
                const userRegions = await UserRegion.findAll({
                    where: {
                        userId
                    },
                    raw: true
                });
                console.log('userRegionssss', userRegions);

                return userRegions;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        deleteUserRegion: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserRegion }
                    }
                }
            }
        ) => {
            const { userId, regionId } = args;

            try {
                UserRegion.destroy({
                    where: {
                        userId,
                        regionId
                    }
                });
            } catch (err) {
                console.log();
            }
        },

        addUserRegion: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { UserRegion }
                    }
                }
            }
        ) => {
            const { userId, regionId } = args;
            const errors = {};

            try {
                console.log(0);
                const checkIfExist = await UserRegion.findOne({
                    where: {
                        userId,
                        regionId
                    }
                });

                if (checkIfExist) {
                    throw (errors.region = 'Region already assigned !');
                }

                const userRegion = await UserRegion.create({
                    userId,
                    regionId
                });

                return userRegion;
            } catch (err) {
                console.log(err);

                return null;
            }
        }
    },

    UserRegion: {
        user: async (
            userRegion,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            try {
                const user = await User.findByPk(userRegion.userId);

                return user;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default userRegionResolvers;
