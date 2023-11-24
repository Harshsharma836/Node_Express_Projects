import { Request , Response } from "express";
import dataSource from "../database/db";
import { User } from "../entity/user.entity";
import { Post } from "../entity/post.entity"
import logger from "../middleware/logger";
const userRepository = dataSource.getRepository(Post);


export const createPost = async(req:Request,res: Response)=>{
    const userId = req.params.userid;
    const post = await userRepository.create({
        title : req.body.title,
        content : req.body.content,
    })

    console.log(post);
    return res.status(201).send({msg : "Post Created"})

}