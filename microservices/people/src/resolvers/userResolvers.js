//#region Types definition
/** @typedef {import('../types/user').User} User */
// /** @typedef {import('#types/schema').GetManyArgs} GetManyArgs */
// /** @typedef {import('#types/schema').GetOneArgs} GetOneArgs */
// /** @typedef {import('#types/schema').UpsertArgs<Country>} CountryUpsertArgs */
// /** @typedef {import('#types/schema').DeleteArgs} DeleteArgs */
// /** @typedef {import("#types/schema").Context} Context */
// /** @typedef {import("#types/schema").ReturnMany<Country>} ReturnManyCountries */
// /** @typedef {import("#types/schema").DeleteResult} DeleteResult */
//#endregion

/**
 * A number, or a string containing a number.
 *
 * @typedef {object} GetOneArgs
 * @property {string} id Unique identifier passed by client
 */

import jwt from 'jsonwebtoken';
import { checkFields, checkErrors, checkPasswords, validateEmail } from '../helpers/fieldValidation/fieldValidation';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 0;

const UserResolvers = {
    Query: {
        /**
         * Get all entities
         *
         * @param {object} _ The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).
         * @param {GetOneArgs} args An object that contains all GraphQL arguments provided for this field.
         * @param {Context} context An object shared across all resolvers that are executing for a particular operation.
         */
        user: async (
            _,
            { id },
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            try {
                const user = await User.findByPk(id);

                return user;
            } catch (err) {
                console.log(err);

                return {};
            }
        },
        users: async (
            _,
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
                const users = await User.findAll();

                return users;
            } catch (err) {
                console.log(err);
            }
        },

        getLoggedUser: async (_, __, { dataSources, user }) => {
            try {
                let loggedUser = await dataSources.sequelize.models.User.findOne({
                    where: {
                        id: user.sub
                    }
                });

                if (!loggedUser) {
                    loggedUser = await dataSources.sequelize.models.Employee.findOne({
                        where: {
                            id: user.sub
                        }
                    });
                }

                return loggedUser;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        login: async (_, args, { dataSources: { sequelize } }) => {
            let { email, password } = args;
            let errors = {};

            try {
                errors = checkFields(args);

                let isOk = checkErrors(errors);

                if (!isOk) {
                    throw errors;
                }

                const user = await sequelize.models.User.findOne({
                    where: {
                        email
                    }
                });

                if (!user) {
                    const employee = await sequelize.models.Employee.findOne({
                        where: {
                            email
                        }
                    });

                    if (!employee) {
                        throw (errors.email = 'No such user!');
                    }

                    // let result = bcrypt.compareSync(password, employee.password);
                    let result = employee.password === password;

                    if (!result) {
                        throw (errors.password = 'Wrong password!');
                    }

                    const token = jwt.sign({ 'https://awesomeapi.com/graphql': { roles: employee.roleId } }, 'f1BtnWgD3VKY', {
                        algorithm: 'HS256',
                        subject: JSON.stringify(employee.id),
                        expiresIn: '1d'
                    });

                    return { token, errors: null };
                } else {
                    if (!user.isApproved) {
                        throw (errors.notApproved = 'Your account is not approved !');
                    }

                    // let result = bcrypt.compareSync(password, user.password);
                    let result = user.password === password;

                    if (!result) {
                        throw (errors.password = 'Wrong password!');
                    }

                    const token = jwt.sign({ 'https://awesomeapi.com/graphql': { roles: user.roleId } }, 'f1BtnWgD3VKY', {
                        algorithm: 'HS256',
                        subject: JSON.stringify(user.id),
                        expiresIn: '1d'
                    });

                    return { token, errors: null };
                }
            } catch (err) {
                console.log('--------', err);
                const token = '';

                return { token, errors: JSON.stringify(errors) };
            }
        },

        register: async (_, args, { dataSources }) => {
            const { firstName, lastName, email, password, confirmPassword } = args;
            let errors = {};
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            let hashedPassword = bcrypt.hashSync(password, salt);

            try {
                errors = checkFields(args);
                let isOk = checkErrors(errors);

                if (!isOk) {
                    throw errors;
                }

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

                const user = await dataSources.sequelize.models.User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    isApproved: 0,
                    roleId: 6
                });

                return { user, errors: null };
            } catch (err) {
                const user = null;

                return { user, errors: JSON.stringify(errors) };
            }
        },

        updateUser: async (
            _,
            args,
            {
                dataSources: {
                    sequelize: {
                        models: { User }
                    }
                }
            }
        ) => {
            const { id, isApproved } = args;

            try {
                const user = await User.findOne({
                    where: {
                        id
                    }
                });

                user.isApproved = isApproved;
                user.save();

                return user;
            } catch (err) {
                console.log(err);

                return null;
            }
        }
    },

    User: {
        role: async (
            user,
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
                return await Role.findByPk(user.roleId);
            } catch (err) {
                console.log(err);
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
    },

    UserCountry: {
        user: async (
            userCountry,
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
                const user = await User.findByPk(userCountry.userId);

                return user;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

export default UserResolvers;
