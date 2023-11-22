import {createUser , userDetails} from "../controllers/user.controller"
import { Router } from "express";

const userRouter = Router();

userRouter.post('/' , createUser);
userRouter.get('/:id/getDetails' , userDetails);


export default userRouter;