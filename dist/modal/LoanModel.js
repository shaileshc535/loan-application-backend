"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoanSchema = new mongoose_1.Schema({
    loan_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "loanCategory",
        required: true,
    },
    loan_sub_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "loanSubCategory",
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    type: {
        type: String,
    },
    isactive: {
        type: Boolean,
        default: true,
    },
    isdeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
LoanSchema.virtual("loanCategory", {
    ref: "loanCategory",
    localField: "loan_category_id",
    foreignField: "_id",
});
LoanSchema.virtual("loanSubCategory", {
    ref: "loanSubCategory",
    localField: "loan_sub_category_id",
    foreignField: "_id",
});
LoanSchema.virtual("user", {
    ref: "user",
    localField: "user_id",
    foreignField: "_id",
});
const loan = (0, mongoose_1.model)("loan", LoanSchema);
exports.default = loan;
//# sourceMappingURL=LoanModel.js.map