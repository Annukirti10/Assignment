import {Request ,Response, NextFunction } from 'express';
import querySchema from '../models/schemaValidators';

export default class Validation{
    async signUp(req:Request, res:Response , next: NextFunction){
        
        const value = querySchema.validate(req.body);
        if(value.error){
            res.json({
                message: value.error.message
            })
        }
        else{
            next();
        }
    }
}
   
