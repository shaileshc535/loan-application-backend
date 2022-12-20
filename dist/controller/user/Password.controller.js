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
const user_1 = __importDefault(require("../../modal/user"));
const Password_reset_token_1 = __importDefault(require("../../modal/Password-reset-token"));
const sendEmail_1 = __importDefault(require("../../services/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const schema = joi_1.default.object({ email: joi_1.default.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: error.details[0].message,
            });
        }
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "user with given email doesn't exist",
            });
        }
        let token = yield Password_reset_token_1.default.findOne({ userId: user._id });
        if (!token) {
            token = yield new Password_reset_token_1.default({
                userId: user._id,
                token: crypto_1.default.randomBytes(32).toString("hex"),
            }).save();
        }
        // const link = `${process.env.BASE_URL}/user/password-reset/${user._id}/${token.token}`;
        function generatePassword() {
            let length = 8, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", retVal = "";
            for (let i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal + "@";
        }
        const tempPass = generatePassword();
        user.password = tempPass;
        yield user.save({ validateBeforeSave: false });
        // await token.delete();
        yield (0, sendEmail_1.default)(user.email, "Here is your temprory created Password", tempPass);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Temp Password",
            Password_Reset_Link: tempPass,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error.message,
            msg: "Something went wrong. Please try again",
        });
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try {
        const { password, confirmPassword } = req.body;
        const schema = joi_1.default.object({
            password: joi_1.default.string().required(),
            confirmPassword: joi_1.default.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: error.details[0].message,
            });
        }
        const user = yield user_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Invalid Link or expired",
            });
        }
        const token = yield Password_reset_token_1.default.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Invalid Link or expired",
            });
        }
        if (!pass_rgex.test(password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password didn't Match",
            });
        }
        user.password = password;
        yield user.save({ validateBeforeSave: false });
        yield token.delete();
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Password Changed!",
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
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const user = req.user;
        const schema = joi_1.default.object({
            currentPassword: joi_1.default.string().required(),
            newPassword: joi_1.default.string().required(),
            confirmNewPassword: joi_1.default.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: error.details[0].message,
            });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(currentPassword, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Invalid Current Password!",
            });
        }
        if (!pass_rgex.test(newPassword)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "New Password and Confirm Password Is not same",
            });
        }
        user.password = newPassword;
        yield user.save({ validateBeforeSave: false });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Password changed successful",
            data: user,
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
const changeTempPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try {
        const { email, tmp_password, new_password, confirm_password } = req.body;
        const schema = joi_1.default.object({ email: joi_1.default.string().email().required() });
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "user with given email doesn't exist",
            });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(tmp_password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Invalid Current Password!",
            });
        }
        if (!pass_rgex.test(new_password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            });
        }
        if (new_password !== confirm_password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "New Password and Confirm Password Is not same",
            });
        }
        user.password = new_password;
        yield user.save({ validateBeforeSave: false });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Password changed successful",
            data: user,
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
const ListAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to Assign the Video",
            });
        }
        let { page, limit, sort, cond } = req.body;
        if (user) {
            cond = Object.assign({}, cond);
        }
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        if (!cond) {
            cond = {};
        }
        if (!sort) {
            sort = { createdAt: -1 };
        }
        limit = parseInt(limit);
        const result = yield user_1.default.find(cond)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield user_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Users Fetch Successfully",
            page: page,
            limit: limit,
            totalPages: totalPages,
            total: result_count,
            data: result,
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
exports.default = {
    forgotPassword,
    resetPassword,
    changePassword,
    changeTempPassword,
    ListAllUsers,
};
//# sourceMappingURL=Password.controller.js.map