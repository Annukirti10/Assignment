import express from 'express'
import logic from '../controller/logic';
import verifyToken from '../middleware/authJWT';
const api = express()

const logicB = new logic()

api.get("/", verifyToken, logicB.getD)
api.post("/signUp", logicB.signUp)
api.put("/put", verifyToken, logicB.putD)
api.delete("/delete", verifyToken, logicB.deleteD)
api.post("/login", logicB.login) 
api.post("/reactivate", verifyToken, logicB.reactivate)
api.post("/msgbroker", logicB.mqttServer)
export default api