import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"

const register = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    console.log("kontakt")
})
const register_get = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    res.send("kontakt")
})

export {
    register,
    register_get
}