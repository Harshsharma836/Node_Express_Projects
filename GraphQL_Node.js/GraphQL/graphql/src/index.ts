import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { books , Address , users , todos } from './data/data';
import { typeDefs } from './schema';
//For env File 
dotenv.config();


  // In Resolver 
  // first books : is a Query schema Name define in typedef Query
  // and second books :  is a data

const resolvers = {
    Query : {
        Address : () => {return Address},
        
        user: (parent : any , userId : any) => {
          console.log("User id is " + userId.userId)
          return users.find(user => {
             return user.userId == userId.userId
          });
        },
    },

    User: {
      todos: (user : any) => {
        return todos.filter(todo => todo.userId === user.userId);
      },
    },

    Mutation : {
      addUser : (parent : any , args : any)=>{
        console.log(args)
        const newUser = {
          userId : ""+users.length+1,
          name : args.name,
          age : args.age
        }
        users.push(newUser);
        return newUser;
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
async function startServer(){
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4006 },
    });
    console.log(`Server Running on Port : 4006`)
}
startServer()
