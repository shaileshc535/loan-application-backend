"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    product_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product_category",
        required: true,
    },
    product_sub_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product_subcategory",
    },
    name: {
        type: String,
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
ProductSchema.virtual("productCategory", {
    ref: "product_category",
    localField: "product_category_id",
    foreignField: "_id",
});
ProductSchema.virtual("productSubCategory", {
    ref: "product_subcategory",
    localField: "product_sub_category_id",
    foreignField: "_id",
});
const product = (0, mongoose_1.model)("product", ProductSchema);
exports.default = product;
//# sourceMappingURL=productModel.js.map