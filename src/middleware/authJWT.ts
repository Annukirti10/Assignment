import { Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function verifyToken(req: Request, res: Response, next: NextFunction) : void {

    const token : string | undefined = req.headers["authorization"];
    if (!token) {
        res.send({ msg: "Please enter the token" })
    }
    else {
        const jwtSecret = String(process.env.JWT_SECRET);
        const userVerification : string | JwtPayload = jwt.verify(`${req.headers["authorization"]}`, jwtSecret);
        if(!userVerification){
            res.send({ msg: "Authentication error" })
        }
        else{
            req.body.id = userVerification;
            next();
        }
    }
}
