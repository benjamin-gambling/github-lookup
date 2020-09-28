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

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
