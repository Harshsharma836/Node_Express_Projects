import { PrismaClient , Prisma } from "@prisma/client";
import { users } from "../data/data";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// for testing purpose 
export const addUser =(parent : any , args : any , context : any)=>{
    const newUser = {
      userId : ""+users.length+1,
      name : args.name,
      age : args.age
    }
    users.push(newUser);
    return newUser;
  }

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
  
    // const valid = await bcrypt.compare(args.password, user.password)
    // if (!valid) {
    //   throw new Error('Invalid password')
    // }

  }
  
