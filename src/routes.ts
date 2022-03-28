import express from 'express'
import logic from './logic';
const api = express()

const logicB = new logic()

api.get("/", logicB.getD)
api.post("/signUp", logicB.signUp)
api.put("/put", logicB.putD)
api.delete("/delete", logicB.deleteD)
api.post("/login", logicB.login)
api.post("/reactivate", logicB.reactivate)

export default api