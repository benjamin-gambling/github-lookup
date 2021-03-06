const express = require("express");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server-express");
const axios = require("axios");

const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
    name: String
  }

  type Query {
    search(filter: String): User
  }
`;

const resolvers = {
  Query: {
    search: async (parent, args, context, info) => {
      let filter = args.filter ? args.filter : {};
      try {
        const users = await axios.get(`https://api.github.com/users/${filter}`);
        let user = (data) => {
          return {
            id: data.id,
            login: data.login,
            avatar_url: data.avatar_url,
            name: data.name,
          };
        };
        return user(await users.data);
      } catch (error) {
        throw error;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/ben", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send('{"message":"Hello from Ben!"}');
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
);

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at ${process.env.PORT || 4000}`);
});
