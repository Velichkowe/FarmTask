import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { sequelize } from '../models/index';
import { resolvers } from '../resolvers';
import typeDefs from '../typeDefs';
const { applyMiddleware } = require('graphql-middleware');
const { permissions } = require('./permissions');

const port = 4001;

const app = express();
app.use(cors(), bodyParser.json());

sequelize.authenticate().then(() => {
    console.log('Database connected !!');
});

const apolloServer = new ApolloServer({
    schema: applyMiddleware(buildFederatedSchema([{ typeDefs, resolvers }]), permissions),
    dataSources: () => ({ sequelize }),
    context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;

        return { user };
    },
    plugins: [ApolloServerPluginInlineTraceDisabled()]
});
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.log(`People service is ready at port: ${port}`));
