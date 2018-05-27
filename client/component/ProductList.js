import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from '../queries/fetchProduct';

class ProductList extends Component {
    
    render() {
        if (this.props.data.loading) {
            return (
                <div>loading...</div>
            )
        }

        return (
            <div>
                <h3>Product List</h3>
                <ul className="collection">
                    {this.props.data.products.map(product => {
                        return (
                            <li key={product.id} className="collection-item">
                                {product.name}
                            </li>
                        )
                    })}
                </ul>
                <Link
                    to="/product/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default graphql(query)(ProductList);