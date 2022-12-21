"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FaqSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
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
        required: true,
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
FaqSchema.virtual("faqAuthor", {
    ref: "user",
    localField: "author",
    foreignField: "_id",
});
const faq = (0, mongoose_1.model)("faq", FaqSchema);
exports.default = faq;
//# sourceMappingURL=faqModal.js.map