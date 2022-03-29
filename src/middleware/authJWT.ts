import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";


export default function verifyToken(req: Request, res: Response, next: NextFunction) : void {

    const token : string | undefined = req.headers["authorization"];
    if (!token) {
        res.send({ msg: "Please enter the token" })
    }
    else {
        const userVer : any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
        if(!userVer){
            res.send({ msg: "Authentication error" })
        }
        else{
            res.json("Authentication successful")
            next();
        }
    }
}