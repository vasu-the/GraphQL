const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id:ID!
    email: String!
    password: String!
  }

  type  Article {
    _id: ID!
    authorName: String!
    article: String!
    authorId: User!
  }
  
  input RegisterInput {
    email: String!
    password: String!
  }
  input LoginInput{
    email: String!
    password: String!
  }

  input forArticle {
    _id: ID!
    authorName: String!
    article: String!
    authorId: String!
  }

  type Query {
    authUser(loginDetails:LoginInput): String
    profile(id:ID):User!
    dashboard:String
    
    getAllArticle:[Article],    
    getOneArticle(id:ID):Article,
    getMyArticle(id:ID):[Article]
    
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User,

    makeArticle(article: forArticle): Article,
    updateArticle(id:ID,data:forArticle):String,
    deleteMyOneArticle(id:ID):String,

    deleteMyAccount(id:ID):String,
  }
`;

module.exports = typeDefs;