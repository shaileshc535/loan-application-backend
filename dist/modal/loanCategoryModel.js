"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoanCategorySchema = new mongoose_1.Schema({
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
const loanCategory = (0, mongoose_1.model)("loanCategory", LoanCategorySchema);
exports.default = loanCategory;
//# sourceMappingURL=loanCategoryModel.js.map