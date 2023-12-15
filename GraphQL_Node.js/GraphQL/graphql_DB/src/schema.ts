

export const typeDefs = `#graphql
   
    type Address {
        authorId : ID!
        city : String
        country : String
    }

    interface UserInt {
      id : ID,
      name : String,
      email : String,
      password : String
      ToDO : [ToDO]
    }

    type User implements UserInt {
      id: ID!
      name: String!
      email : String!
      password : String!
      ToDO : [ToDO]
    }

    type ToDO {
      id: ID!
      userId : ID!
      task: String!
    }

    type AuthPayLoad {
        token : String
        user : User
    }

    type Mutation {
      signup(email : String , password : String , name : String ) : AuthPayLoad
      login(email : String , password : String ) : AuthPayLoad
      addToDO(userId : Int , task : String) : ToDO
    }

    type Query {
        Address(id : ID) : [Address]
        user(userId: ID! offSet : Int , limit : Int): User
    }
`