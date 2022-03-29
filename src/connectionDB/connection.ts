import mongoose from "mongoose"

const connection =  con().catch(err => console.log("error"));


async function con() : Promise<void> {
    try{
        await mongoose.connect("mongodb://localhost:27017/Register")
        console.log("connected to db")
    }
    catch(err){
        throw err
    }
}

export default connection