const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query');
const mutations = require('./mutation');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
