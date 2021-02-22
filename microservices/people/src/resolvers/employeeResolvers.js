import { checkErrors, checkPasswords, validateEmail } from '../helpers/fieldValidation/fieldValidation';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 0;

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
        },

        allEmployeesByUserId: async (
            _,
            { userId },
            {
                dataSources: {
                    sequelize: {
                        models: { Employee }
                    }
                }
            }
        ) => {
            try {
                const employees = await Employee.findAll({
                    where: {
                        userId
                    }
                });

                return employees;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        addEmployee: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Employee }
                    }
                }
            }
        ) => {
            const { userId, firstName, lastName, email, address, number, salary, password, confirmPassword } = args;
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            let hashedPassword = bcrypt.hashSync(password, salt);
            let errors = {};
            let isOk = false;

            try {
                errors = validateEmail(email);
                isOk = checkErrors(errors);

                if (!isOk) {
                    throw errors;
                }

                errors = checkPasswords(hashedPassword, confirmPassword);
                isOk = checkErrors(errors);

                if (!isOk) {
                    throw errors;
                }

                const employee = await Employee.create({
                    userId,
                    firstName,
                    lastName,
                    email,
                    address,
                    number,
                    salary,
                    password: hashedPassword,
                    roleId: 9
                });

                return { employee, errors: null };
            } catch (err) {
                const employee = null;

                return { employee, errors: JSON.stringify(errors) };
            }
        },

        updateEmployee: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { Employee }
                    }
                }
            }
        ) => {
            const { id, firstName, lastName, email, address, number, salary } = args;

            try {
                const employee = await Employee.findByPk(id);

                employee.firstName = firstName;
                employee.lastName = lastName;
                employee.email = email;
                employee.address = address;
                employee.number = number;
                employee.salary = salary;
                await employee.save();

                return employee;
            } catch (err) {
                console.log(err);

                return null;
            }
        },

        deleteEmployee: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { Employee }
                    }
                }
            }
        ) => {
            try {
                const rows = await Employee.destroy({
                    where: {
                        id
                    }
                });

                return rows;
            } catch (err) {
                console.log(err);

                return null;
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
