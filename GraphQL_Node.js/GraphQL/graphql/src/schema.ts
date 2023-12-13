export const typeDefs = `#graphql
    type Book {
        title : String
        author : Author
    }

    type Author {
        authorId : ID!,
        name : String
        book : [Book]
        address : [Address]
    }

    type Address {
        authorId : ID!
        city : String
        country : String
    }

    type User {
      userId: ID!
      name: String!
      age : Int!
      todos: [Todo]!
    }
    type Todo {
      todoId: ID!
      userId: ID!
      task: String!
    }

    type Mutation {
      addUser(name : String , age : Int) : User
    }

    type Query {
        books : [Book]
        authors : [Author]
        Address(id : ID) : [Address]
        user(userId: ID!): User
    }
`