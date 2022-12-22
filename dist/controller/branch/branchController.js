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
const branchModel_1 = __importDefault(require("../../modal/branchModel"));
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        const uniqueId = Math.random().toString(36).substr(2, 9);
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Branch.",
            });
        }
        if (!requestData.branch_name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch name is required.",
            });
        }
        const newBranch = new branchModel_1.default({
            branch_name: requestData.branch_name,
            branch_code: uniqueId,
            address: requestData.address,
            landmark: requestData.landmark,
            city: requestData.city,
            state: requestData.state,
            country: requestData.country,
            pincode: requestData.pincode,
            phone: requestData.phone,
            fax: requestData.fax,
        });
        yield newBranch.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Branch Created successfully",
            data: newBranch,
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
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Branch details.",
            });
        }
        if (!requestData.branchId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch Id is required.",
            });
        }
        const Branch = yield branchModel_1.default.findById({
            _id: requestData.branchId,
        });
        if (!Branch) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch not found.",
            });
        }
        const data = {
            branch_name: requestData.branch_name,
            branch_code: requestData.branch_code,
            address: requestData.address,
            landmark: requestData.landmark,
            city: requestData.city,
            state: requestData.state,
            country: requestData.country,
            pincode: requestData.pincode,
            phone: requestData.phone,
            fax: requestData.fax,
        };
        yield branchModel_1.default.findByIdAndUpdate({
            _id: requestData.branchId,
        }, data);
        const result = yield branchModel_1.default.findById({
            _id: requestData.branchId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Branch Updated Successfully",
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
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Branch.",
            });
        }
        if (!requestData.branchId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch Id is required.",
            });
        }
        const Branch = yield branchModel_1.default.findById({
            _id: requestData.branchId,
        });
        if (!Branch) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield branchModel_1.default.findByIdAndUpdate({
            _id: requestData.branchId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Branch Deleted Successfully",
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
const activateDeactiveBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Branch details.",
            });
        }
        if (!requestData.branchId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch Id is required.",
            });
        }
        const Data = yield branchModel_1.default.findById({
            _id: requestData.branchId,
        });
        if (!Data) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch not found.",
            });
        }
        const data = {
            isactive: !Data.isactive,
        };
        yield branchModel_1.default.findByIdAndUpdate({
            _id: requestData.branchId,
        }, data);
        const result = yield branchModel_1.default.findById({
            _id: requestData.branchId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Branch Status Updated Successfully",
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
const findByIdBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchId = req.params.id;
        const result = yield branchModel_1.default.findById({
            _id: branchId,
            isdeleted: false,
            isactive: true,
        })
            .populate("city")
            .populate("state")
            .populate("country");
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Branch not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Branch Fetch Successfully",
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
const ListBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield branchModel_1.default.find(cond)
            .populate("city")
            .populate("state")
            .populate("country")
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield branchModel_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Branches List Fetch Successfully",
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
    createBranch,
    updateBranch,
    deleteBranch,
    activateDeactiveBranch,
    findByIdBranch,
    ListBranch,
};
//# sourceMappingURL=branchController.js.map