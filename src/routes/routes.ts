import express from 'express'
import logic from '../controller/user.controller';
import verifyToken from '../middleware/authJWT';
const api = express()

const logicBuild = new logic()

api.get("/get", verifyToken, logicBuild.getData)
api.post("/signUp", logicBuild.signUp)
api.put("/put", verifyToken, logicBuild.putData)
api.delete("/delete", verifyToken, logicBuild.deleteData)
api.post("/login", logicBuild.login) 
api.post("/reactivate", verifyToken, logicBuild.reactivate)

export default api