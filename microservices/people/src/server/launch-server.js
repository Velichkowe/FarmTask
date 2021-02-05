const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');
const { buildFederatedSchema } = require('@apollo/federation');
const { sequelize } = require('../models/index');

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers');

const port = 4001;

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
	plugins: [ApolloServerPluginInlineTraceDisabled()],
});

server.listen({ port }).then(({ url }) => {
	console.log(`People service is ready at: ${url}`);

	sequelize.authenticate().then(() => {
		console.log(`Database connected !!`);
	})
});