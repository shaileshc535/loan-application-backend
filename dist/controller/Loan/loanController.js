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
const LoanModel_1 = __importDefault(require("../../modal/LoanModel"));
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create loan.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Category is required.",
            });
        }
        if (!requestData.subCategoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Sub Category is required.",
            });
        }
        if (!requestData.userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User Id is required.",
            });
        }
        const newLoan = new LoanModel_1.default({
            loan_category_id: requestData.categoryId,
            loan_sub_category_id: requestData.subCategoryId,
            user_id: requestData.userId,
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        });
        yield newLoan.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "loan Created successfully",
            data: newLoan,
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
const updateLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update loan details.",
            });
        }
        if (!requestData.loanId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Id is required.",
            });
        }
        const categoryData = yield LoanModel_1.default.findById({
            _id: requestData.loanId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan details not found.",
            });
        }
        const data = {
            loan_category_id: requestData.categoryId,
            loan_sub_category_id: requestData.subCategoryId,
            user_id: requestData.userId,
            name: requestData.name,
            slug: requestData.slug,
            type: requestData.type,
        };
        yield LoanModel_1.default.findByIdAndUpdate({
            _id: requestData.loanId,
        }, data);
        const result = yield LoanModel_1.default.findById({
            _id: requestData.loanId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "loan Details Updated Successfully",
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
const deleteLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update loan details.",
            });
        }
        if (!requestData.loanId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Id is required.",
            });
        }
        const loanData = yield LoanModel_1.default.findById({
            _id: requestData.loanId,
        });
        if (!loanData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan details not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield LoanModel_1.default.findByIdAndUpdate({
            _id: requestData.loanId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "loan Deleted Successfully",
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
const activateDeactiveLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update loan details.",
            });
        }
        if (!requestData.loanId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan Id is required.",
            });
        }
        const loanData = yield LoanModel_1.default.findById({
            _id: requestData.loanId,
        });
        if (!loanData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan details not found.",
            });
        }
        const data = {
            isactive: !loanData.isactive,
        };
        yield LoanModel_1.default.findByIdAndUpdate({
            _id: requestData.loanId,
        }, data);
        const result = yield LoanModel_1.default.findById({
            _id: requestData.loanId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "loan Deleted Successfully",
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
const findByIdLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loanId = req.params.id;
        const result = yield LoanModel_1.default
            .findById({
            _id: loanId,
            isdeleted: false,
            isactive: true,
        })
            .populate("loan_category_id")
            .populate("loan_sub_category_id")
            .populate("user_id");
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Loan details not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan details fetch successfully",
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
const ListLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield LoanModel_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "loan List Fetch Successfully",
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
const LoanCalculator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedData = req.body;
        const loanAmount = Number(requestedData.loanAmount);
        const loanInsterRate = Number(requestedData.loanInsterRate);
        const loan_tenure = Number(requestedData.loan_tenure);
        const tenure = loan_tenure * 12;
        if (loanAmount !== null && loanInsterRate !== 0) {
            const RateOfIntrest = loanInsterRate / 12 / 100;
            const EMI = Number(loanAmount *
                RateOfIntrest *
                (Math.pow(1 + RateOfIntrest, tenure) /
                    (Math.pow(1 + RateOfIntrest, tenure) - 1)));
            const total_amount = EMI * tenure;
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Loan Amount Calculate successfully",
                data: [EMI, total_amount],
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Loan details fetch successfully",
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
    createLoan,
    updateLoan,
    deleteLoan,
    activateDeactiveLoan,
    findByIdLoan,
    ListLoan,
    LoanCalculator,
};
//# sourceMappingURL=loanController.js.map