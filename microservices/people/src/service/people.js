const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { sequelize } = require('../models');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const port = 4001;

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

module.exports = server;