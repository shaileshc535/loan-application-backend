"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoanSubCategorySchema = new mongoose_1.Schema({
    loan_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "loanCategory",
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    type: {
        type: String,
    },
    isdeleted: {
        type: Boolean,
        default: false,
    },
    isactive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
LoanSubCategorySchema.virtual("loanCategory", {
    ref: "loanCategory",
    localField: "loan_category_id",
    foreignField: "_id",
});
const loanSubCategory = (0, mongoose_1.model)("loanSubCategory", LoanSubCategorySchema);
exports.default = loanSubCategory;
//# sourceMappingURL=loanSubCategoryModel.js.map