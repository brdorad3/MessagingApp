import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";
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

const add_contact = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({username: req.body.search})
    user.length > 0 ? res.send(user) : res.send([])
})
const fetch_user_data = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id).populate("contacts");
    res.send(user)
})
const update_contacts = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    
    const user = await User.findById(req.params.id);
    const user2 = await User.find({username: req.body.contactInfo[0].username})
    const contactId = user2[0]._id as mongoose.Types.ObjectId
    
    
    if (!user?.contacts.includes(contactId)) {
        user?.contacts.push(contactId); 
        await user?.save(); 
        res.status(200).json(user);
    } else {
        res.status(400).json({ message: 'Contact already exists' });
    }
   
})


export {
    register,
    register_get,
    about_post,
    add_contact,
    fetch_user_data,
    update_contacts
    
}