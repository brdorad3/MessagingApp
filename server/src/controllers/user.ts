import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler"
const multer = require('multer');

const register = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    console.log("kontakt")
})
const register_get = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    res.send("kontakt")
})
const about_post = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.about_me = req.body.about;
        await user.save();
        console.log(user)
        res.status(200).json({ about_me: user.about_me });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





export {
    register,
    register_get,
    about_post,
    
}