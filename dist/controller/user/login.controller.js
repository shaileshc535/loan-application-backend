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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../modal/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const verifiedEmail = email.toLowerCase();
    try {
        user_1.default.findOne({
            email: verifiedEmail,
        }).exec((err, user) => {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    success: false,
                    message: err,
                });
            }
            if (!user) {
                return res.status(400).send({
                    status: 400,
                    success: false,
                    message: "User Not Found",
                });
            }
            if (user.is_active !== true) {
                return res.status(400).send({
                    status: 400,
                    success: false,
                    message: "Your Account is not Activated. Please Contact with Admin to re-activate your account.",
                });
            }
            const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(400).send({
                    status: 400,
                    success: false,
                    message: "Invalid Password!",
                });
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 86400, //24 hours
            });
            res.status(200).send({
                status: 200,
                success: true,
                message: "User Successfully Logged-In",
                data: Object.assign(Object.assign({}, user.toObject()), { token: token }),
            });
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error.message,
            msg: "Something went wrong. Please try again",
        });
    }
});
exports.default = login;
//# sourceMappingURL=login.controller.js.map