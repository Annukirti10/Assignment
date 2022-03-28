"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_1 = __importDefault(require("./logic"));
const api = (0, express_1.default)();
const logicB = new logic_1.default();
api.get("/", logicB.getD);
api.post("/signUp", logicB.signUp);
api.put("/put", logicB.putD);
api.delete("/delete", logicB.deleteD);
api.post("/login", logicB.login);
// api.post("/sp", logicB.securePassword)
exports.default = api;
