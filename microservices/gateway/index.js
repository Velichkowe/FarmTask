const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'people', url: 'http://localhost:4001' },
    ]
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
});

const port = 4000;

server.listen({ port }).then(({ url }) => {
    console.log(`Gateway ready at: ${url}`);
});

// import '#server/launch-server';
