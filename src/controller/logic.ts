import { Request, Response } from "express";
import user from '../models/user'
import md5 from "md5"
import jwt from "jsonwebtoken";


class logic {

    getD = async (req: Request, res: Response) => {

        const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
        if (!userVer) {
            res.send({ msg: "Authentication error" })
        } else {
            let result: any = await user.find({ _id: userVer._id });
            if (result.activationStatus === "inactive") {
                res.json("Account is deactivated")
                console.log("deactivated account");

            }
            // console.log(userVer);
            else {
                res.send(result)
            }
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            const doc: any = new user({
                email: req.body.email,
                password: md5((req.body.password).toString()),
                cpassword: md5((req.body.cpassword).toString()),
                fname: req.body.fname,
                lname: req.body.lname,
                dob: req.body.dob,
                city: req.body.city,
                state: req.body.state,
                phoneNumber: req.body.phoneNumber
            })

            await doc.save()
            res.send({ msg: "Created" })
        }
        catch (error) {
            res.send(error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const email: String = req.body.email;
            const password: String = md5((req.body.password).toString());

            const usermail: any = await user.findOne({ email: email });
            if (password === usermail.password) {
                if (usermail.activationStatus === "active") {

                    res.json("Successfully logged in")
                }
                else {
                    res.send({ msg: "Reactivate the account first" })
                }
            }
            else {
                res.send({ msg: "invalid password" })
            }

            const token = await usermail.generateAuthToken();
            console.log(token)
        }
        catch (error) {
            res.send({ msg: "Please enter valid credentials or first sign up if not yet" })
        }
    }

    putD = async (req: Request, res: Response) => {
        try {
            const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey")
            console.log(userVer)
            if (!userVer) {
                res.send({ msg: "Authentication error" })

            } else {
                let result = await user.findOneAndUpdate({ _id: userVer._id }, { fname: req.body.upfname });
                if (result != null) {
                    res.send({ msg: "Updated" })

                } else {
                    res.send({ msg: "Info didn't match" })
                }
            }
            // console.log(result)
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteD = async (req: Request, res: Response) => {
        try {
            const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
            if (!userVer) {
                res.send({ msg: "Authentication error" })

            } else {
                // console.log(userVer);

                const result: any = await user.findOneAndUpdate({ _id: userVer._id }, { activationStatus: "inactive" });
                // console.log(result)
                await result.save();
                res.send({ msg: "deleted" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    reactivate = async (req: Request, res: Response) => {
        try {
            const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
            if (!userVer) {
                res.send({ msg: "Authentication error" })

            } else {
                const result: any = await user.findOneAndUpdate({ _id: userVer._id }, { activationStatus: "active" });
                // console.log(result)
                await result.save();
                res.send({ msg: "Activated" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    mqttServer = async (req: Request, res: Response) => {
        const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
        if (!userVer) {
            res.send({ msg: "Authentication error" })

        }
        else {
            const mosca = require('mosca');

            const settings = {
                port: 2000
            }
            const server = new mosca.Server(settings);

            server.on('ready', () => {
                console.log("server ready");
                res.json("Server ready")
            })
        }
    }
}
export default logic;