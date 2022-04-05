import { Request, Response } from "express";
import user from '../models/user'
import md5 from "md5"
import multer from 'multer'

class logic {
    getData = async (req: Request, res: Response) => {
        const userId = req.body.id._id;
        const userDetail: any = await user.findOne({ _id: userId });
        if (userDetail.activationStatus === "inactive") {
            res.json("Account is deactivated")
        }
        else {
            res.json(userDetail)
        }
    }

    signUp = async (req: Request, res: Response) => {

        try {
            interface user {
                email: string;
                password: string;
                cpassword: string;
                fname: string;
                lname: string;
                dob: Date;
                city: string;
                state: string;
                phoneNumber: string;
            }

            const use: user = req.body;

            const userDocument = new user({
                email: use.email,
                password: md5((use.password).toString()),
                cpassword: md5((use.cpassword).toString()),
                fname: use.fname,
                lname: use.lname,
                dob: use.dob,
                city: use.city,
                state: use.state,
                phoneNumber: use.phoneNumber
            })

            if (userDocument.password === userDocument.cpassword) {
                await userDocument.save()
                res.json("Created")
            }
            else {
                res.json("Please enter the same password and confirm password")
            }
        }
        catch (error) {
            res.json(error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const email: String = req.body.email;
            const password: String = md5((req.body.password).toString());
            const userDetail: any = await user.findOne({ email: email });
            if (password === userDetail.password) {
                if (userDetail.activationStatus === "active") {
                    const token = await userDetail.generateAuthToken();
                    userDetail.tokens=token;
                    await userDetail.save()
                    console.log(token);
                    res.json(`Successfully logged in and token is ${token}`)
                }
                else {
                    res.json("Reactivate the account first")
                }
            }
            else {
                res.json("invalid password")
            }

        }
        catch (err : any) {
            res.json(err.message)
        }
    }

    putData = async (req: Request, res: Response) => {
        try {
            const userId = req.body.id._id;
            let result: any = await user.findOne({ _id: userId });
            if (result != null) {
                if (result.activationStatus === "active") {
                    const updatedData = await user.findOneAndUpdate({ _id: result._id }, { fname: req.body.upfname })
                    res.json(updatedData)
                }
                else {
                    res.json("The user is deactivated. Pls reactivate the account")
                }
            } else {
                res.json("Info didn't match")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteData = async (req: Request, res: Response) => {
        try {
            const userId = req.body.id._id;
            const result: any = await user.findOneAndUpdate({ _id: userId }, { activationStatus: "inactive" });
            await result.save();
            res.json("deleted")
        }
        catch (err) {
            console.log(err)
        }
    }

    reactivate = async (req: Request, res: Response) => {
        try {
            const userId = req.body.id._id;
            const result: any = await user.findOneAndUpdate({ _id: userId }, { activationStatus: "active" });
            await result.save();
            res.json("Activated")
        }
        catch (err) {
            console.log(err)
        }
    }

    upload = async (req: Request, res: Response) => {
        const storage: any = multer.diskStorage({
            destination: function (req, file: Express.Multer.File, cb: any) {
                cb(null, './uploads');
            },
            filename: function (req, file: any, cb: any) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        });

        const uploadImage: any = multer({ storage: storage })

        uploadImage.single('file')(req, res, function (err: any) {
            try {
                if (err instanceof multer.MulterError) {
                    res.json(err)
                } else if (err) {
                    res.json(err)
                }
                else {
                    const file = req.file
                    res.json(file)
                }
            }
            catch (err) {
                res.json(err)
            }
        })
    }
}

export default logic;