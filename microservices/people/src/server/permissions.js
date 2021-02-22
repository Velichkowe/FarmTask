const { rule, shield, allow } = require('graphql-shield');

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
});

const permissions = shield({
    Query: {
        getLoggedUser: isAuthenticated,
        users: isAuthenticated,
        user: isAuthenticated
    },
    Mutation: {
        register: allow,
        login: allow,
        updateUser: isAuthenticated,
        addEmployee: allow
    },
    // Farm: {
    //     user: isAuthenticated
    // },
    User: {
        role: isAuthenticated
    }
});

module.exports = { permissions };
