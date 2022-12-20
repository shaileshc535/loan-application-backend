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
const loanCategoryModel_1 = __importDefault(require("../../modal/loanCategoryModel"));
const createLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create loan category.",
            });
        }
        if (!requestData.name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category name is required.",
            });
        }
        const newLoanCategory = new loanCategoryModel_1.default({
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        });
        yield newLoanCategory.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category Created successfully",
            data: newLoanCategory,
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
const updateLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update loan category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is requireds.",
            });
        }
        const categoryData = yield loanCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        };
        yield loanCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield loanCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category Updated Successfully",
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
const deleteLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete loan category.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is required.",
            });
        }
        const categoryData = yield loanCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield loanCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category Deleted Successfully",
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
const activateDeactiveLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update loan category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is required.",
            });
        }
        const categoryData = yield loanCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            isactive: !categoryData.isactive,
        };
        yield loanCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield loanCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category Status Updated Successfully",
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
const findByIdLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield loanCategoryModel_1.default.findById({
            _id: categoryId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category Fetch Successfully",
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
const ListLoanCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, limit, sort, cond } = req.body;
        let search = "";
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit) {
            limit = 9;
        }
        if (!cond) {
            cond = {};
        }
        if (!sort) {
            sort = { createdAt: -1 };
        }
        if (typeof cond.search != "undefined" && cond.search != null) {
            search = String(cond.search);
            delete cond.search;
        }
        cond = [
            {
                $match: {
                    isdeleted: false,
                    isactive: true,
                    $and: [
                        cond,
                        {
                            $or: [{ name: { $regex: search, $options: "i" } }],
                        },
                    ],
                },
            },
            { $sort: sort },
            {
                $facet: {
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                    total: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ];
        limit = parseInt(limit);
        const result = yield loanCategoryModel_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Category List Fetch Successfully",
            page: page,
            limit: limit,
            totalPages: totalPages,
            total: result[0].total.length != 0 ? result[0].total[0].count : 0,
            data: result[0].data,
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
    createLoanCategory,
    updateLoanCategory,
    deleteLoanCategory,
    activateDeactiveLoanCategory,
    findByIdLoanCategory,
    ListLoanCategory,
};
//# sourceMappingURL=loanCategoryController.js.map