import { Request, Response } from "express";
import user from './user'
import md5 from "md5"
import jwt from "jsonwebtoken";


class logic {

    getD = async (req: Request, res: Response) => {

        const userVer: any = jwt.verify(`${req.headers["authorization"]}`, "secretKey");
        if (!userVer) {
            res.send({ msg: "Authentication error" })

        } else {
            let result = await user.find({ _id: userVer._id });
            // console.log(userVer);
            res.json(result)
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
            // 
            // 
            // 

            // const token = doc.generateAuthToken();

            await doc.save()
            res.send({ msg: "Created" })
        }
        catch (error) {
            res.send(error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const password = md5((req.body.password).toString());

            const usermail: any = await user.findOne({ email: email });
            if (password === usermail.password) {
                if (usermail.status === "active") {

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
            const userVer : any = jwt.verify(`${req.headers["authorization"]}`, "secretKey")
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
    catch(err) {
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

            const result: any = await user.findOneAndUpdate({ _id: userVer._id }, { status: "inactive" });
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
            const result: any = await user.findOneAndUpdate({ _id: userVer._id }, { status: "active" });
            // console.log(result)
            await result.save();
            res.send({ msg: "Activated" })
        }
    }
    catch (err) {
        console.log(err)
    }
}
}

export default logic;