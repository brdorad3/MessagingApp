import { NextFunction, Request, Response } from "express";

export function test(req: Request, res: Response, next: NextFunction){
    res.send({msg: "tiru liru"})
}
