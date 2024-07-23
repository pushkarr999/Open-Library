import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface CustomHeaders extends Headers{
    token?: string
} 

export interface CustomRequest extends Request {
    decoded_token?: JwtPayload
}