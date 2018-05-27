const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => (
        {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            price: { type: GraphQLFloat },
            quantity: { type: GraphQLInt },
            url: { type: GraphQLString },
            picture: { type: GraphQLString },
            vendor: { type: GraphQLString }
        }
    )
});

module.exports = ProductType;