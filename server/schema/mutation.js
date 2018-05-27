const mongoose = require('mongoose');
const graphql = require('graphql');
const ProductType = require('./product_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID
} = graphql;

const Product = mongoose.model('product');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                url: { type: new GraphQLNonNull(GraphQLString) },
                picture: { type: new GraphQLNonNull(GraphQLString) },
                vendor: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args){
                return (new Product(args)).save()
            }
        },
      deleteSong: {
        type: ProductType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
          return Product.remove({ _id: id });
        }
      }
    }
  });
  
  module.exports = mutation;