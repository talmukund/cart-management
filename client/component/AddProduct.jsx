import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";
import gql from "graphql-tag";
import query from "../queries/fetchProduct";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            quantity: "",
            url: "",
            vendor: "",
            picture: ""
        }
    }

    componentWillMount() { }

    onFileChange(e) {
        let files = e.target.files;
        if (files.length == 0) {
            return
        }
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        const self = this
        reader.onload = function (upload) {
            self.setState({picture: upload.target.result})
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity,
                url: this.state.url,
                picture: this.state.picture,
                vendor: this.state.vendor
            },
            refetchQueries: [{ query }]
        }).then(data => {
            hashHistory.push("/")
        });
    }

    render() {
        return (
            <div>
                <h3>Create a new product</h3>
                <form>
                    <label > Name</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            });
                        }}
                        value={this.state.name}
                        required="true"
                    />
                    <label > Price</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                price: e.target.value
                            });
                        }}
                        value={this.state.price}
                        required="true" 
                    />
                    <label > Quantity</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                quantity: e.target.value
                            });
                        }}
                        value={this.state.quantity}
                        required="true" 
                    />
                    <label > Url</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                url: e.target.value
                            });
                        }}
                        value={this.state.url}
                        required="true" 
                    />
                    <label > Vendor</label>
                    <input
                        onChange={(e) => {
                            this.setState({
                                vendor: e.target.value
                            });
                        }}
                        value={this.state.vendor}
                        required="true" 
                    />
                    <div className="row">

                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Browse</span>
                                <input type="file" multiple onChange={this.onFileChange.bind(this)} ref="file" required="true" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload multiple files" required="true" />
                            </div>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light btn-large" onClick={this.onSubmit.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddProduct($name: String!, $price: Float!, $quantity: Int!, $url: String!, $picture: String!, $vendor: String!){
    addProduct(name: $name, price: $price, quantity: $quantity, url: $url, picture: $picture, vendor: $vendor){
    id
        name
    }
}
`;

export default graphql(mutation)(AddProduct);