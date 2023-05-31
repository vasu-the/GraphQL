require('./mongoose/db')
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const http = require('http')
const app = express();

const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(express.json());
app.use('*',cors()); 



const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers/index");

async function createApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req,res})=>{
      return {req,res}
    }
  })
  const startServer = async () => {
    try {
      await apolloServer.start()
      apolloServer.applyMiddleware({ app, path: '/graphql' });
    }
    catch (err) {
      console.error(`Error starting server: ${err.message}`);
    }
  }
  startServer();
  const server = http.createServer(app);

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening at http://${HOSTNAME}:${PORT}`);
  });

}
createApolloServer();