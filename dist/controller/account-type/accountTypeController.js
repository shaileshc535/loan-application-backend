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
const accountTypeModel_1 = __importDefault(require("../../modal/accountTypeModel"));
const createAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Account-Type.",
            });
        }
        if (!requestData.name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type name is required.",
            });
        }
        const newAccountType = new accountTypeModel_1.default({
            name: requestData.name,
            description: requestData.description,
        });
        yield newAccountType.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Account-Type Created successfully",
            data: newAccountType,
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
const updateAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Account-Type details.",
            });
        }
        if (!requestData.accountTypeId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type Id is required.",
            });
        }
        const AccountType = yield accountTypeModel_1.default.findById({
            _id: requestData.accountTypeId,
        });
        if (!AccountType) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type not found.",
            });
        }
        const data = {
            name: requestData.name,
            description: requestData.description,
        };
        yield accountTypeModel_1.default.findByIdAndUpdate({
            _id: requestData.accountTypeId,
        }, data);
        const result = yield accountTypeModel_1.default.findById({
            _id: requestData.accountTypeId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Account-Type Updated Successfully",
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
const deleteAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Account-Type.",
            });
        }
        if (!requestData.accountTypeId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type Id is required.",
            });
        }
        const AccountType = yield accountTypeModel_1.default.findById({
            _id: requestData.accountTypeId,
        });
        if (!AccountType) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield accountTypeModel_1.default.findByIdAndUpdate({
            _id: requestData.accountTypeId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Account-Type Deleted Successfully",
            data: "",
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
const activateDeactiveAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Account-Type details.",
            });
        }
        if (!requestData.accountTypeId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type Id is required.",
            });
        }
        const Data = yield accountTypeModel_1.default.findById({
            _id: requestData.accountTypeId,
        });
        if (!Data) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type not found.",
            });
        }
        const data = {
            isactive: !Data.isactive,
        };
        yield accountTypeModel_1.default.findByIdAndUpdate({
            _id: requestData.accountTypeId,
        }, data);
        const result = yield accountTypeModel_1.default.findById({
            _id: requestData.accountTypeId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Account-Type Status Updated Successfully",
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
const findByIdAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountTypeId = req.params.id;
        const result = yield accountTypeModel_1.default.findById({
            _id: accountTypeId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Account-Type not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Account-Type Fetch Successfully",
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
const ListAccountType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        let { page, limit, sort, cond } = req.body;
        // if (user) {
        cond = Object.assign({ isactive: true, isdeleted: false }, cond);
        // }
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
        const result = yield accountTypeModel_1.default.find(cond)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield accountTypeModel_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Account Type List Fetch Successfully",
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
    createAccountType,
    updateAccountType,
    deleteAccountType,
    activateDeactiveAccountType,
    findByIdAccountType,
    ListAccountType,
};
//# sourceMappingURL=accountTypeController.js.map