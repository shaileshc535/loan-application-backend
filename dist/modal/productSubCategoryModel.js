"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSubCategorySchema = new mongoose_1.Schema({
    product_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product_category",
    },
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
ProductSubCategorySchema.virtual("productCategory", {
    ref: "product_category",
    localField: "product_category_id",
    foreignField: "_id",
});
const product_subcategory = (0, mongoose_1.model)("product_subcategory", ProductSubCategorySchema);
exports.default = product_subcategory;
//# sourceMappingURL=productSubCategoryModel.js.map