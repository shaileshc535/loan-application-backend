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
const request_1 = __importDefault(require("request"));
const ActivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to activate user.",
                data: "",
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "User Not Found.",
                data: "",
            });
        }
        const data = {
            is_active: !findUser.is_active,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Activation Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const userRollUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to change user role.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const role = req.body.role;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        if (!role) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Role is required.",
                data: "",
            });
        }
        if (role !== "admin" &&
            role !== "manager" &&
            role !== "employee" &&
            role !== "user") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Please Select a valid role for user.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Not Found.",
                data: "",
            });
        }
        const data = {
            role: role,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Role Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const userPermissionsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update user permissions.",
                data: "",
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "User Not Found.",
                data: "",
            });
        }
        const data = {
            permissions: req.body.permissions,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Permissions Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const userAppsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update user apps.",
                data: "",
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Not Found.",
            });
        }
        const data = {
            apps: req.body.apps,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Apps Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const UserEmailVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to verify Email Details.",
                data: "",
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Not Found.",
                data: "",
            });
        }
        const userEmail = findUser.email;
        if (!userEmail) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Email is not available in our records.",
                data: "",
            });
        }
        const data = {
            is_email_verified: !findUser.is_email_verified,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Email Verification Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const UserPhoneVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to verify Phone Details.",
                data: "",
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
                data: "",
            });
        }
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Not Found.",
                data: "",
            });
        }
        const userPhone = findUser.phone;
        if (!userPhone) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Phone details is not available in our records.",
                data: "",
            });
        }
        const data = {
            is_phone_verified: !findUser.is_phone_verified,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Phone Verification Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const SendPhoneOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const digits = "0123456789";
        let otpcode = "";
        for (let i = 0; i < 6; i++) {
            otpcode += digits[Math.floor(Math.random() * 10)];
        }
        const phoneno = req.body.phone;
        const template_id = "61bc3e52089ea00e2037e19b";
        const authkey = "369515AvQUtlElEF61922bb1P1";
        const otp_length = "6";
        const options = {
            method: "GET",
            url: "https://api.msg91.com/api/v5/otp?template_id=" +
                template_id +
                "&mobile=+91" +
                phoneno +
                "&authkey=" +
                authkey +
                "&otp=" +
                otpcode +
                "&otp_length=" +
                otp_length +
                "",
        };
        (0, request_1.default)(options, (error, response) => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "error=" + error,
                    data: "",
                });
            }
            res.status(200).send({
                success: true,
                data: [{ phoneno: phoneno, otp: otpcode }],
                response: response.body,
                msg: "Success",
            });
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
    ActivateUser,
    userRollUpdate,
    userPermissionsUpdate,
    userAppsUpdate,
    UserEmailVerify,
    UserPhoneVerify,
    SendPhoneOTP,
};
//# sourceMappingURL=permission.controller.js.map