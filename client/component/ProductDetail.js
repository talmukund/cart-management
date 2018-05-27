import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from '../queries/fetchProduct';


class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct(event) {
        console.log(this.props)
        this.props.mutate({
            variables: {
                id: this.props.data.product.id
            },
            refetchQueries: [{ query }]
        }).then(data => {
            hashHistory.push("/")
        });

    }
    render() {
        if (this.props.data.loading) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div>
                <h3>
                    {this.props.data.product.name}
                </h3>
                <h5>
                    Price: ${this.props.data.product.price}
                </h5>
                <h5>
                    Url: {this.props.data.product.url}
                </h5>
                <h5>
                    Vendor: {this.props.data.product.vendor}
                </h5>
                <div>
                    <img src={this.props.data.product.picture} />
                </div>
                <button
                    className="btn-floating btn-large red right"
                    onClick={this.deleteProduct}
                >
                    <i className="material-icons">delete</i>
                </button>
                <button
                    className="btn-floating btn-large blue left"
                >
                    <i className="material-icons">edit</i>
                </button>
            </div>
        )
    }
}

const mutation = gql`
mutation DeleteProduct($id: ID!){
    deleteProduct(id: $id){
      id
      name
    }
  }`

const productQuery = gql`
query Product($id:ID!){
    product(id: $id){
      id
      name
      price
      url
      vendor
      picture
    }
  }
`;

export default compose(
    graphql(mutation),
    graphql(productQuery, {
        options: ({ params: { id } }) => ({ variables: { id: id } })
    }
    )
)(ProductDetail);


