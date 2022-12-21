"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "blogCategory",
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    summary: {
        type: String,
    },
    main_image: {
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
BlogSchema.virtual("blogCategory", {
    ref: "blogCategory",
    localField: "category",
    foreignField: "_id",
});
BlogSchema.virtual("blogAuthor", {
    ref: "user",
    localField: "author",
    foreignField: "_id",
});
const blog = (0, mongoose_1.model)("blog", BlogSchema);
exports.default = blog;
//# sourceMappingURL=blogsModel.js.map