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
const loanSubCategoryModel_1 = __importDefault(require("../../modal/loanSubCategoryModel"));
const createLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Loan Sub-Category.",
            });
        }
        if (!requestData.name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Sub-Category name is required.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Category Id is required.",
            });
        }
        const newLoanSubCategory = new loanSubCategoryModel_1.default({
            loan_category_id: requestData.categoryId,
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        });
        yield newLoanSubCategory.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category Created successfully",
            data: newLoanSubCategory,
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
const updateLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Loan Sub-Category details.",
            });
        }
        if (!requestData.subCategoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category Id is requireds.",
            });
        }
        const categoryData = yield loanSubCategoryModel_1.default.findById({
            _id: requestData.subCategoryId,
        });
        console.log("categoryData", categoryData);
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category not found.",
            });
        }
        const data = {
            loan_category_id: requestData.categoryId,
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        };
        yield loanSubCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.subCategoryId,
        }, data);
        const result = yield loanSubCategoryModel_1.default.findById({
            _id: requestData.subCategoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category Updated Successfully",
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
const deleteLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Loan Sub-Category.",
            });
        }
        if (!requestData.subCategoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category Id is required.",
            });
        }
        const categoryData = yield loanSubCategoryModel_1.default.findById({
            _id: requestData.subCategoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield loanSubCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.subCategoryId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category Deleted Successfully",
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
const activateDeactiveLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Loan Sub-Category details.",
            });
        }
        if (!requestData.subCategoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category Id is required.",
            });
        }
        const categoryData = yield loanSubCategoryModel_1.default.findById({
            _id: requestData.subCategoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category not found.",
            });
        }
        const data = {
            isactive: !categoryData.isactive,
        };
        yield loanSubCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.subCategoryId,
        }, data);
        const result = yield loanSubCategoryModel_1.default.findById({
            _id: requestData.subCategoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category Status Updated Successfully",
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
const findByIdLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategoryId = req.params.id;
        const result = yield loanSubCategoryModel_1.default
            .findById({
            _id: subCategoryId,
            isdeleted: false,
            isactive: true,
        })
            .populate("loan_category_id");
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sub-Category not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category Fetch Successfully",
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
const ListLoanSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield loanSubCategoryModel_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Loan Sub-Category List Fetch Successfully",
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
    createLoanSubCategory,
    updateLoanSubCategory,
    deleteLoanSubCategory,
    activateDeactiveLoanSubCategory,
    findByIdLoanSubCategory,
    ListLoanSubCategory,
};
//# sourceMappingURL=loanSubCategoryController.js.map