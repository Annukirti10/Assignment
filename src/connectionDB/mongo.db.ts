import mongoose from "mongoose"
const connection =  con().catch(err => console.log("error"));

async function con() : Promise<void> {
    try{
        const host = process.env.LOCAL_HOST
        const dbName = process.env.DB_NAME
        const connectionString = `mongodb://${host}/${dbName}` 
        await mongoose.connect(connectionString)
        console.log("connected to db")
    }
    catch(err){
        throw err
    }
}

export default connection