"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 3 },
    cpassword: { type: String, required: true, minlength: 3 },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: Number, required: true, minlength: 10 },
    tokens: { type: String }
});
schema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = jsonwebtoken_1.default.sign({ _id: this._id.toString() }, "secretKey");
            // this.tokens = token;
            // const userVer = jwt.verify(token, "Afterinstallingtheexpressmoduleyoucancheckyourexpressversionin")
            // console.log(userVer);
            yield this.save();
            return token;
        }
        catch (error) {
            console.log(error);
        }
    });
};
// schema.pre("save", async function(next) {
//     if(this.isModified("password")){
//         // console.log(` ${this.password}`);
//         this.password = await bcrypt.hash(this.password, 10)
//         // console.log(` ${this.password}`);
//         this.cpassword = await bcrypt.hash(this.cpassword, 10)
//     }
//     next();
// })
const user = (0, mongoose_1.model)('User', schema);
function fun() {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.init();
    });
}
fun();
exports.default = user;
