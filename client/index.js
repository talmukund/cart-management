import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./component/App";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import ProductDetail from "./component/ProductDetail";

const client = new ApolloClient({})


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path = "/" component= {App}>
          <IndexRoute component = {ProductList}/>
          <Route path="/product/new" component ={AddProduct}/>
          <Route path="/product/:id" component ={ProductDetail}/>
        </Route>        
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);