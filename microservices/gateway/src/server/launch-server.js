import express from 'express';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

const port = 4000;

const app = express();
app.use(
    cors(),
    bodyParser.json(),
    expressJwt({
        secret: 'f1BtnWgD3VKY',
        algorithms: ['HS256'],
        credentialsRequired: false
    })
);

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'people', url: 'http://localhost:4001/graphql' },
        { name: 'farm', url: 'http://localhost:4002/graphql' },
        { name: 'location', url: 'http://localhost:4003/graphql' }
    ],
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null);
            }
        });
    }
});

const apolloServer = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => {
        const user = req.user || null;

        return { user };
    },
    plugins: [ApolloServerPluginInlineTraceDisabled()]
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () => console.log(`Gateway ready at port: ${port}`));
