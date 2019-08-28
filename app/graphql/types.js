const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    firstName: String! @deprecated(reason: "converts to full name")
    lastName: String! @deprecated(reason: "converts to full name")
    name: String!
    username: String!
    email: String!
    password: String!
    id: ID!
  }
  type Album {
    artist: Int!
    title: String!
    photos: [Photo]
    id: ID!
  }
  type Photo {
    title: String!
    url: String!
    thumbnailUrl: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
`;
