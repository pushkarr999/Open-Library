import Ajv, { Schema } from "ajv";
import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "../utility/httpcode";

const ajv = new Ajv({allErrors: true, strict: false, useDefaults: true})

ajv.addKeyword("errorMessages")
require('ajv-keywords')(ajv, ["transform"])
require('ajv-errors')(ajv)

function parseNumber(schema: any, reqData: any){
    for(let sch in schema){
        if(schema[sch].type === "number"){
            reqData[sch] = parseInt(reqData[sch])
        }else if(schema[sch].type === "object"){
            parseNumber(schema[sch].properties, reqData)
        }
    }
}

const inputValidation = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const method = req.method
        let reqData
        if(method === "GET") {
            reqData = {...req.query, ...req.params}
            parseNumber((schema as any).properties, reqData)
        }
        else if(method === "POST") {
            reqData = {...req.query, ...req.params, ...req.body}
            parseNumber((schema as any).properties, reqData)
        }
        else if(method === "PUT") {
            reqData = {...req.query, ...req.params, ...req.body}
            parseNumber((schema as any).properties, reqData)
        }else if(method === "DELETE") {
            reqData = {...req.query, ...req.params, ...req.body}
            parseNumber((schema as any).properties, reqData)
        }

        const validate = ajv.compile(schema)
        const valid = validate(reqData)

        if(valid){
            next()
        }else{
            console.log("Input validation failed ", validate.errors)
            if(validate.errors){
                const errorMessage = validate.errors.map((error) => error.message?.toString())[0]
                res.status(BAD_REQUEST).json({status: "error", message: errorMessage})
            }
        }
    }
}

export default inputValidation