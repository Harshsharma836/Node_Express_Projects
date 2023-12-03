import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from 'body-parser';
import cors from 'cors';
import  axios  from 'axios';

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs : `
            type User{
                id : ID!
                name : String!
                username : String!
                email : String!
                phone : String!
                website : String!
            }
            type Todo {
                id : ID!
                title : String! 
                completed : Boolean   
                user : User
            }

            type Query {
                getTodos : [Todo]
                getAllUsers : [User]
                getUser(id : ID!) : User
            }
        `,
        resolvers : {
            Todo : {
                user : async(todo) =>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
            },
            Query : {
                getTodos : async()=>
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers :  async()=>
                (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser : async(parent , {id})=>
                (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    });
 

    app.use(bodyParser.json());
    app.use(cors());

    await server.start()

    app.use('/graphql' , expressMiddleware(server));
    
    app.listen(8000 , ()=>{
        console.log('App is Running on Port 8000');
    })
}

startServer()