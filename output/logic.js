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
const user_1 = __importDefault(require("./user"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class logic {
    constructor() {
        this.getD = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userVer = jsonwebtoken_1.default.verify(req.headers["authorization"], "secretKey");
            let result = yield user_1.default.find({ _id: userVer._id });
            console.log(userVer);
            res.json(result);
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = new user_1.default({
                    email: req.body.email,
                    password: (0, md5_1.default)((req.body.password).toString()),
                    cpassword: (0, md5_1.default)((req.body.cpassword).toString()),
                    fname: req.body.fname,
                    lname: req.body.lname,
                    dob: req.body.dob,
                    city: req.body.city,
                    state: req.body.state,
                    phoneNumber: req.body.phoneNumber
                });
                // const token = doc.generateAuthToken();
                yield doc.save();
                res.send({ msg: "Created" });
            }
            catch (error) {
                res.send(error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = (0, md5_1.default)((req.body.password).toString());
                const usermail = yield user_1.default.findOne({ email: email });
                if (password === usermail.password) {
                    res.send({ msg: "Successfully logged in" });
                }
                else {
                    res.send({ msg: "invalid password" });
                }
                const token = yield usermail.generateAuthToken();
                console.log(token);
            }
            catch (error) {
                res.send({ msg: "Please enter valid credentials or first sign up if not yet" });
            }
        });
        this.putD = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_1.default.findOneAndUpdate({ fname: req.body.fname }, { $set: { fname: req.body.fnameup } }, {
                    new: true
                });
                if (result != null) {
                    res.send({ msg: "Updated" });
                }
                else {
                    res.send({ msg: "Info didn't match" });
                }
                // console.log(result)
            }
            catch (err) {
                console.log(err);
            }
        });
        this.deleteD = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_1.default.findOne({ function(DelDoc) {
                        req.body.DelDoc.email;
                    } });
                if (data != null) {
                    yield user_1.default.findOneAndDelete({ _id: data._id });
                    res.send({ msg: "deleted" });
                }
                else {
                    res.send({ msg: "Enter The valid data" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        // createToken = async(req: Request, res: Response) => {
        //     const token = await jwt.sign({_id : "62332fd178cabdfe925b8347"}, "Afterinstallingtheexpressmoduleyoucancheckyourexpressversionin", {
        //         expiresIn: "5 seconds"
        //     })
        //     console.log(token)
        //     const userVer = await jwt.verify(token, "Afterinstallingtheexpressmoduleyoucancheckyourexpressversionin")
        //     console.log(userVer);
        //     res.send({msg : "token created"})
        // }
        // securePassword =async (req: Request, res: Response) => {
        //     const securepassword =async <Promise>(password: string) => {
        //         const passwordHash = await bcrypt.hash(password, 10)
        //         console.log(passwordHash)
        //         const passwordMatch = await bcrypt.compare(req.body.pswdM, passwordHash)
        //         console.log(passwordMatch)
        //     }
        //     securepassword(req.body.pswd)
        // }
    }
}
exports.default = logic;
