import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Link, hashHistory } from "react-router";
import productQuery from "../queries/fetchSingleProduct";


class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            price: "",
            quantity: "",
            url: "",
            vendor: "",
            picture: ""
        }
    }

    componentWillReceiveProps(newProps){
        if(this.state.id !==newProps.data.product.id){
            this.setState({
                id: newProps.data.product.id,
                name: newProps.data.product.name,
                price: newProps.data.product.price,
                quantity: newProps.data.product.quantity,
                url: newProps.data.product.url,
                vendor: newProps.data.product.vendor,
            });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                id: this.state.id,
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity,
                url: this.state.url,
                vendor: this.state.vendor
            }
        }).then(data => {
            hashHistory.push(`/product/${this.props.data.product.id}`)
        });
    }


    render() {
        return (
            <div>
                <h3>Update the product</h3>
                <form>
                    <label > Name</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            });
                        }}
                        value={this.state.name}
                        
                    />
                    <label > Price</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                price: e.target.value
                            });
                        }}
                        value={this.state.price}
                         
                    />
                    <label > Quantity</label>
                    <input
                        onChange={(e) => {
                            this.setState({quantity: e.target.value
                            });
                        }}
                        value={this.state.quantity}
                         
                    />
                    <label > Url</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                url: e.target.value
                            });
                        }}
                        value={this.state.url}
                         
                    />
                    <label > Vendor</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                vendor: e.target.value
                            });
                        }}
                        value={this.state.vendor}
                         
                    />
                    <button className="btn waves-effect waves-light btn-large" onClick={this.onSubmit.bind(this)}>Update</button>
                </form>
            </div>
        )
    }
}

  const mutation = gql`
  mutation EditProduct($id: ID!, $name: String, $price: Float, $quantity: Int, $url: String, $picture: String, $vendor: String){
      editProduct(id: $id, name: $name, price: $price, quantity: $quantity, url: $url, picture: $picture, vendor: $vendor){
      id
      name
      }
  }
  `;
export default compose(
    graphql(mutation),
    graphql(productQuery, {
        options: ({ params: { id } }) => ({ variables: { id: id } })
    }
    )
)(UpdateProduct);