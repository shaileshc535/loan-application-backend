"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    description: {
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
const blogCategory = (0, mongoose_1.model)("blogCategory", BlogCategorySchema);
exports.default = blogCategory;
//# sourceMappingURL=blogCategoryModel.js.map