const EmployeeResolvers = {
    Query: {
        employees: async (
            _,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { Employee }
                    }
                }
            }
        ) => {
            try {
                const employees = await Employee.findAll();

                return employees;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Employee: {
        user: async (
            employee,
            __,
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            return await User.findByPk(employee.userId);
        }
    }
};

export default EmployeeResolvers;
