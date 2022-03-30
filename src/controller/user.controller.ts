import { Request, Response } from "express";
import user from '../models/user'
import md5 from "md5"


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
            const userDocument: any = new user({
                email: req.body.email,
                password: md5((req.body.password).toString()),
                confirmPassword: md5((req.body.confirmPassword).toString()),
                fname: req.body.fname,
                lname: req.body.lname,
                dob: req.body.dob,
                city: req.body.city,
                state: req.body.state,
                phoneNumber: req.body.phoneNumber
            })
            if (userDocument.password === userDocument.confirmPassword) {
                await userDocument.save()
                res.json("Created")
            }
            else{
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

                    res.json("Successfully logged in")
                }
                else {
                    res.json("Reactivate the account first")
                }
            }
            else {
                res.json( "invalid password" )
            }

            const token = await userDetail.generateAuthToken();
            console.log(token)
        }
        catch (error) {
            res.json("Please enter valid credentials or first sign up if not yet" )
        }
    }

    putData = async (req: Request, res: Response) => {
        try {
            const userId = req.body.id._id;
            let result : any = await user.findOne({ _id: userId });
            if (result != null) {
                if(result.activationStatus === "active"){
                    const updatedData = await user.findOneAndUpdate({ _id: result._id }, { fname: req.body.upfname })
                    res.json(updatedData)
                }
                else{
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
            res.send("deleted")

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
            res.send("Activated")
        }
        catch (err) {
            console.log(err)
        }
    }
}
export default logic;