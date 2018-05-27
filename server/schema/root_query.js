const mongoose = require('mongoose');
const graphql = require('graphql');
const ProductType = require('./product_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = graphql;
const Product = mongoose.model('product');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:()=>( {
        products: {
            type: new GraphQLList(ProductType),
            resolve(){
                return Product.find({});
            }
        },
        product: {
            type: ProductType,
            args: {id: {
               type: new GraphQLNonNull(GraphQLID)
            }},
            resolve(parentValue, args){
                return Product.findById(args.id);
            }
        }
    })
});

module.exports = RootQuery;
