const { rule, shield, allow } = require('graphql-shield');

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
});

const permissions = shield({
    Query: {
        farms: isAuthenticated,
        fields: isAuthenticated
    },
    User: {
        farms: isAuthenticated
    }
    // Mutation: {
    //     register: allow,
    //     login: allow,
    //     updateUser: allow
    // }
});

module.exports = { permissions };
