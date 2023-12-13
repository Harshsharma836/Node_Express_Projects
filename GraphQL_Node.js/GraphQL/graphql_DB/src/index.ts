import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {  Address , users , todos } from './data/data';
import { typeDefs } from './schema';
import { addUser, login, signup } from './resolvers/mutations';
import { user } from './resolvers/query';
import { Prisma } from '@prisma/client';

//For env File 
dotenv.config();

  // In Resolver 
  // first books : is a Query schema Name define in typedef Query
  // and second books :  is a data

const resolvers = {
    Query : {
        Address : () => {return Address},
        user
    },
    User: {
      todos: (user : any) => {
        return todos.filter(todo => todo.userId === user.userId);
      },
    },
    Mutation : {
      addUser,
      signup,
      login
    }
}

interface myContext{
  authScope ? : String
}

const server = new ApolloServer<myContext>({
    typeDefs,
    resolvers,
})

async function startServer(){
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4006 },
        // context is to pass data from req
        context: async ({ req, res }) => ({
          authScope: (req.headers.authorization),
        }),
    });
    console.log(`Server Running on Port : 4006`)
}
startServer()
