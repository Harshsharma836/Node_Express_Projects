import { Request } from "express";
import { UserReqObject } from "../helper/user.interface";
import { PrismaClient} from "@prisma/client";
// import { jwt } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import { GraphQLError } from "graphql";
const prisma = new PrismaClient();

export function authenticate(req : UserReqObject){
    if(req.user){
        throw new Error('You must be logged in to access this resource')
    }
}

export function getUser(token : any){
    const decoded = jwt.verify(token, "SECRET"); 
    if(!decoded){
        throw new GraphQLError('UnAuthorized');
    }
    return decoded;

}