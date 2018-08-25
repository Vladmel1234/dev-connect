import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Post {
    text: String
    user: User
    name: String
    avatar: String
    likes: [User]!
    comments: [Comment]!
    date: String
  }

  type Comment {
    user: User
    text: String
    name: String
    type: String
    avatar: String
    date: String
  }

  type User {
    name: String
    id: ID
  }

  type Query {
    posts: [Post]
  }
`
export default typeDefs
