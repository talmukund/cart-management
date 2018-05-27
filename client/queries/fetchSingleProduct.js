import gql from "graphql-tag";

export default gql`
query Product($id:ID!){
    product(id: $id){
      id
      name
      price
      url
      quantity
      picture
      vendor
    }
  }
`;