import { PrismaClient , Prisma } from "@prisma/client";
// import { users } from "../data/data";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function signup(parent : any, args : any, context : any) {
    try{
      const user = await prisma.user.create({data : args})
      const token = jwt.sign({ userId: user.id }, "SECRET")
    
      return {
        token,
        user,
      }
    }
    catch(err : any){
      console.log(err.message)
    }
  }
  
  export async function login(parent : any, args : any, context : any) {
    console.log({args})
    try{
      const user = await prisma.user.findFirst({ where : { email: args.email } });
      if (!user) {
        throw new Error('No such user found')
      }
      const token = jwt.sign({ userId: user.id }, "SECRET")
      return {
        token,
        user,
      }
    }
    catch(err){
      console.log(err)
    }
  }

  export const addToDO = async(parent : any , args : any , context : any) =>{
    try{
      if(!context.user){
        throw new Error(`UnAuthorized Access `)
      }
      const userid = context.user.userId;
      
      args.userId = userid;
      const toDO = await prisma.toDO.create({
        data : args
      })
      return toDO;
    }
    catch(error){
      console.log(error)
    }
  }
  
