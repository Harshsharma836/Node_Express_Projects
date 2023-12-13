export const typeDefs = `#graphql
   
    type Address {
        authorId : ID!
        city : String
        country : String
    }

    type User {
      userId: ID!
      name: String!
      email : String!
      password : String!
      todos: [Todo]
    }

    type Todo {
      todoId: ID!
      userId: ID!
      task: String!
    }

    type AuthPayLoad {
        token : String
        user : User
    }

    type Mutation {
      addUser(name : String , age : Int) : User

      signup(email : String , password : String , name : String ) : AuthPayLoad
      login(email : String , password : String ) : AuthPayLoad
    }

    type Query {
        Address(id : ID) : [Address]
        user(userId: ID!): User
    }
`