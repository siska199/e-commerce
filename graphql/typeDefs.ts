import { gql } from "apollo-server-micro";

const typeDefs = gql`
  
  type User {
    id: ID!
    username : String!
    email : String!
    password : String
    image : String
    role : String
    shippingAddress : ShippingAddress
  }

  type ShippingAddress{
    firstname : String!
		lastname :String!
		country :String!
		address :String!
		optional: String!
		city :String!
		postalcode :String!
  }

  type Category {
    id : ID!
    name : String!
  }

  type Product{
    name : String!
    price : Float !
    images : [String!]!
    desc : String!
    info: String
    comments: [Comment]
    reviews : [Review]
    stocks : Float!
    category : Category!
    options : OptionsProduct! 
  }
  type Comment{
    user : String!
    body : String!
  }
  type Review {
    user : String!
    rate : Float!
  }
  type OptionsProduct {
		colors: [String!]!
		sizes : [String!]!
  }
  type Options{
    color : String
    size : String
  }

  type ProductV2 {
    product : Product
    quantity : Float
    options : Options
  }

  type Cart {
    user : String!
    products : [ProductV2!]!
    totalPrice : Float!
  }

  type Order {
    user : String!
    products : [ProductV2!]!
    totalPrice : Float!
    status : String!
  }

  type Query {
    getUsers: [User]
    getUser(userId : ID!) : User
  }

  input RegisterInput{
    username : String!
    email : String!
    password : String
  }

  type Mutation{
    register(registerInput:RegisterInput):User
  }

`;

export default typeDefs;
