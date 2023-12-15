import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import {  Address , users , todos } from './data/data';
import { typeDefs } from './schema';
// import { addUser, login, signup } from './resolvers/mutations';
import {  addToDO , login , signup } from './resolvers/mutations';
import {  ToDO, user } from './resolvers/query';
import { Prisma } from '@prisma/client';
import { getUser } from './middleware/auth.middleware';
import { GraphQLError } from 'graphql';

//For env File 
dotenv.config();

  // In Resolver 
  // first books : is a Query schema Name define in typedef Query
  // and second books :  is a data

const resolvers = {
    Query : {
        user
    },
    User: {
      ToDO
    },
    Mutation : {
      signup,
      login,
      addToDO
    }
}

interface myContext{
  authScope ? : String
}

const server = new ApolloServer<myContext>({
    typeDefs,
    resolvers,
})

// const link = createHttpLink({
//   uri: '/graphql',
//   credentials: 'same-origin'
// });

async function startServer(){
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4006 },
        
        context: async ({ req, res }) => {
          const token = req.headers.authorization || '';
          if(token === '') return {msg : "Token Required"}
          // Verifying the token .
          const user = await getUser(token);
          if(!user){
             throw new Error('UnAuthorized')
          }
          return { user };
        },
    });
    console.log(`Server Running on Port : 4006`)
}
startServer()
