const { rule, shield, allow } = require('graphql-shield');

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
});

const permissions = shield({
    Query: {
        farms: isAuthenticated,
        fields: isAuthenticated,
        getLoggedUser: isAuthenticated,
        users: isAuthenticated,
        user: isAuthenticated
    },
    User: {
        role: isAuthenticated
    },
    Mutation: {
        register: allow,
        login: allow,
        updateUser: isAuthenticated,
        addEmployee: allow
    }
});

module.exports = { permissions };
