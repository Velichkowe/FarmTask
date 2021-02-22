const RoleResolvers = {
    Query: {
        roles: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Role }
                    }
                }
            }
        ) => {
            try {
                const roles = await Role.findAll();

                return roles;
            } catch (err) {
                console.log(err);
            }
        },

        getRoleById: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { Role }
                    }
                }
            }
        ) => {
            try {
                const role = await Role.findByPk(id);

                return role;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Role: {
        users: async (
            role,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            return await User.findAll({
                where: {
                    roleId: role.id
                }
            });
        }
    },

    Employee: {
        role: async (
            employee,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Role }
                    }
                }
            }
        ) => {
            try {
                const role = await Role.findByPk(employee.roleId);

                return role;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default RoleResolvers;
