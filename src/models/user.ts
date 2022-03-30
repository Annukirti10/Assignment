import {Schema, model} from 'mongoose'
import jwt, { JwtPayload } from "jsonwebtoken"

interface User {
    email : String;
    password : String;
    cpassword : String;
    fname : String;
    lname : String;
    dob : String;
    city : String;
    state : String;
    phoneNumber : Number,
    tokens : String,
    activationStatus : String,
    generateAuthToken(): string
}

const schema = new Schema<User> ({
    email : {type : String, unique : true, required : true},
    password : {type : String, required : true, minlength : 3},
    cpassword : {type : String, required : true, minlength : 3},
    fname : {type : String, required : true},
    lname : {type : String, required : true},
    dob : {type : String, required : true},
    city : {type : String, required : true},
    state : {type : String, required : true},
    phoneNumber : {type : Number, required : true, minlength: 10},
    activationStatus : {type : String, required : true, default : "active"},
    tokens : {type:String}
});

schema.methods.generateAuthToken = async function () {
    try{
        const token : string | JwtPayload = jwt.sign({_id : this._id.toString()}, "secretKey")
        await this.save();
        return token;
    }
    catch(error){
        console.log(error) 
    }
    
}

const user = model<User>('User', schema)
async function fun(){
    await user.init();
}

fun();

export default user






