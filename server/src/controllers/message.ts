import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import Message from "../models/message";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";

const message_post = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    
    const user2 = await User.findOne({username: req.body.chat})

    const message = new Message({
        from: user,
        to: user2,
        content: req.body.mess
    })
    await message.save()
    res.status(200).json(message)
    

})

export{
    message_post
}