import { Request , Response } from "express";
import dataSource from "../database/db";
import { User } from "../entity/user.entity";
import { Post } from "../entity/post.entity"
import logger from "../middleware/logger";
const userRepository = dataSource.getRepository(User);

export const createUser = async( req : Request, res : Response)=>{
    try{
        console.log(req.body);
        let {email , password} = req.body;
        try{
            const newUser = userRepository.create({
                email: email,
                password: password,
            });
            const saveUser = await userRepository.save(newUser);
        }
        catch(err : any){
            logger.error(`Error ${err}`);
            console.log(err.message)
        }
        // console.log(saveUser + "nothing");
        return res.status(200).send("User Successfully Created");
    }   
    catch(error : any){
        res.status(500).json({ error: error. essage });
    }
}

export const userDetails = async(req:Request,res:Response)=>{
    if(req.params.id === undefined){
        logger.info('User Id is Undefined');
        return res.status(500).send("Id is Required");
    }
    let id = parseInt(req.params.id);
    const user = userRepository.findOneBy({
        id : id
    });
    if(!user) return res.status(404).send(`No User By this Id ${id}`)
    return res.status(200).send({user : user});
}
