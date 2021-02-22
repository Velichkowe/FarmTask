import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { checkFields, checkErrors, checkPasswords, validateEmail } from '../helpers/fieldValidation/fieldValidation';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 0;

const UserResolvers = {
    Query: {
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

        getLoggedUser: async (parent, args, { dataSources, user }) => {
            try {
                const loggedUser = await dataSources.sequelize.models.User.findOne({
                    where: {
                        userId: user.sub
                    }
                });

                return loggedUser;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        login: async (parent, args, { dataSources: { sequelize } }) => {
            let { email, password } = args;
            let errors = {};
            console.log(password);

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
                    throw (errors.email = 'No such user!');
                }

                if (!user.isApproved) {
                    throw (errors.notApproved = 'Your account is not approved !');
                }

                let result = bcrypt.compareSync(password, user.password);

                if (!result) {
                    throw (errors.password = 'Wrong password!');
                }

                const token = jwt.sign({ 'https://awesomeapi.com/graphql': { roles: user.roleId } }, 'f1BtnWgD3VKY', {
                    algorithm: 'HS256',
                    subject: user.userId,
                    expiresIn: '1d'
                });

                return { token, errors: null };
            } catch (err) {
                const token = '';

                return { token, errors: JSON.stringify(errors) };
            }
        },

        register: async (parent, args, { dataSources }) => {
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
                    userId: uuid(),
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
            const { userId, isApproved } = args;

            try {
                const user = await User.findOne({
                    where: {
                        userId
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
            return await Role.findByPk(user.roleId);
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
