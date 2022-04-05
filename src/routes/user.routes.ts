import express from 'express'
import logic from '../controller/user.controller';
import verifyToken from '../middleware/authJWT';
import Validation from '../middleware/validatorMiddleware'
const api = express()
const logicBuild = new logic()
const validation = new Validation()

api.get("/get", verifyToken, logicBuild.getData)
api.post("/signUp", validation.signUp, logicBuild.signUp)
api.put("/put", verifyToken, logicBuild.putData)
api.delete("/delete", verifyToken, logicBuild.deleteData)
api.post("/login", logicBuild.login) 
api.post("/reactivate", verifyToken, logicBuild.reactivate)
api.post('/upload', verifyToken, logicBuild.upload);


export default api