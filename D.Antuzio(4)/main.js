const { ApolloServer } = require('apollo-server');

const schema = require('./schemos/index');

const server = new ApolloServer({
  schema,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
