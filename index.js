const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

// Database connection
const connection = require('./config/db');
connection();

// Creating the server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Running the server
server.listen().then(({ url }) => {
  console.log(`Server is running on port: ${url}`);
});
