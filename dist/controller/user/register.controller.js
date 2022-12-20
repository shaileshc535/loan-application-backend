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
/* eslint-disable no-useless-escape */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
const user_1 = __importDefault(require("../../modal/user"));
const sendEmail_1 = __importDefault(require("../../services/sendEmail"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerData = req.body;
        if (!registerData.email) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email is required.",
            });
        }
        else {
            if (!email_validator_1.default.validate(registerData.email)) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Please enter a valid email.",
                });
            }
            else {
                const user_count = yield user_1.default.find({ email: registerData.email });
                if (user_count.length != 0) {
                    return res.status(400).json({
                        status: 400,
                        success: false,
                        message: "User already exist.",
                    });
                }
                else {
                    if (user_count.length != 0) {
                        return res.status(400).json({
                            status: 400,
                            success: false,
                            message: "This Email is already assiociate with us.",
                        });
                    }
                }
            }
        }
        if (!registerData.phone) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Please enter your phone number.",
            });
        }
        else {
            const user_count = yield user_1.default.find({ phone: registerData.phone });
            if (user_count.length != 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Phone number already in use.",
                });
            }
        }
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must not contain Whitespaces.",
            });
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must have at least one Uppercase Character.",
            });
        }
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must have at least one Lowercase Character.",
            });
        }
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must contain at least one Digit.",
            });
        }
        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must contain at least one Special Symbol.",
            });
        }
        const isValidLength = /^.{6,16}$/;
        if (!isValidLength.test(registerData.password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must be 6-16 Characters Long.",
            });
        }
        if (registerData.password != registerData.confirmPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password and confirm Password dosen't match.",
            });
        }
        const user = new user_1.default(Object.assign({}, req.body));
        let data = yield user.save();
        data = JSON.parse(JSON.stringify(data));
        yield (0, sendEmail_1.default)(data.email, "Congratulations Account Created Successfully", "Congratulations your account is created. Please add your professional info and wait for the admin approval.");
        const response = yield user_1.default.findByIdAndUpdate(data._id, { new: true });
        const token = jsonwebtoken_1.default.sign({ _id: data._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Registration Successfully",
            data: Object.assign(Object.assign({}, response.toObject()), { token: token }),
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
exports.default = register;
//# sourceMappingURL=register.controller.js.map