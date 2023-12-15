import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { UserInterface } from "../helper/user.interface";
import { GraphQLError } from "graphql";
        
export const user = async(parent : any , userId : any , context : any) => {
            if(!context.user){
                throw new GraphQLError('UnAuthorized', {
                    extensions: {
                    code: '400',
                    },
                });
            }
            const userid = parseInt(userId.userId);
            const user = await prisma.user.findUnique({where : {
                id : userid
            }, })
            if(!user){
                if (!user) throw new Error(`No User Available by ${userId} `)
            }   
            return user;
        
}

export const ToDO = async(user : any , args : any , context : any  , info : any) => {
    console.log(user)
    try{
        if(!context.user){
            console.log('user is not there')
            throw new GraphQLError('Invalid argument value', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  argumentName: 'id',
                },
              });
        }
        if(!user){
            throw new Error(`No User Avilable by ID ${user.id}`)
        }
        const userid = parseInt(user.id);
        const ToDO = await prisma.toDO.findMany({where : {
            userId : userid
        }, })
        if(!ToDO){
            console.log("to do is not there")
            throw new Error(`No ToDo Available for User ${user.id} `)
        }   
        return ToDO;
    }
    catch(err : any){
        console.log(err.message)
    }
}

// export const fetch

// export const Address =() => {
//     return Address
// }
