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
const ActivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to activate user.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
                message: "User Not Found.",
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
            status: true,
            type: "success",
            message: "User Activation Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
        });
    }
});
const userRollUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to change user role.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
                message: "User Not Found.",
            });
        }
        const data = {
            role: req.body.role,
        };
        yield user_1.default.findByIdAndUpdate({
            _id: userId,
        }, data);
        const result = yield user_1.default.findById({ _id: userId });
        res.status(200).json({
            status: true,
            type: "success",
            message: "User Role Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
        });
    }
});
const userPermissionsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to update user permissions.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
                message: "User Not Found.",
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
            status: true,
            type: "success",
            message: "User Permissions Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
        });
    }
});
const userAppsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to update user apps.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
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
            status: true,
            type: "success",
            message: "User Apps Updated Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
        });
    }
});
const UserEmailVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to verify Email Details.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
                message: "User Not Found.",
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
            status: true,
            type: "success",
            message: "User Email Verification Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
        });
    }
});
const UserPhoneVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (user.role != "admin") {
            return res.status(200).json({
                status: false,
                type: "success",
                message: "You are not authorise to verify Phone Details.",
                data: "",
            });
        }
        const userId = req.body.userId;
        const findUser = yield user_1.default.findById({ _id: userId });
        if (!findUser) {
            return res.status(404).json({
                status: false,
                type: "success",
                message: "User Not Found.",
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
            status: true,
            type: "success",
            message: "User Phone Verification Status Changed Successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            type: "error",
            message: error,
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
};
//# sourceMappingURL=permission.controller.js.map