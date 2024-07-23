import { NextFunction, Response } from "express";
import { NOT_FOUND, UNAUTHORIZED } from "../utility/httpcode";
import { verifyToken } from "../utility/helper";
import { CustomRequest } from "../utility/interface";
import { JwtPayload } from "jsonwebtoken";


function checkToken(){
    return (req: CustomRequest,res: Response, next: NextFunction) => {
        try {
            const tokenHeader = req.headers.token

            if(!tokenHeader){
                return res.status(NOT_FOUND).json({status: 'error', message: 'Token not found'})
            }
            
            const decoded_token = verifyToken(tokenHeader as string)
            req.decoded_token = decoded_token as JwtPayload
            next()
        } catch (error:any) {
            return res.status(UNAUTHORIZED).json({status: 'error', message: error.message})
        }
    }
}

export {
    checkToken
}