const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const { data } = await axios.get(
          `http://localhost:3000/users/${args.id}`
        );
        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
