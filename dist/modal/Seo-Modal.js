"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SeoSchema = new mongoose_1.Schema({
    page_name: {
        type: String,
        required: true,
    },
    page_url: {
        type: String,
    },
    meta_title: {
        type: String,
        required: true,
    },
    meta_description: {
        type: String,
        required: true,
    },
    heading_tags: {
        type: String,
    },
    seo_icon: {
        type: String,
    },
    web_icon: {
        type: String,
    },
    isdeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const seo_modal = (0, mongoose_1.model)("seo_modal", SeoSchema);
exports.default = seo_modal;
//# sourceMappingURL=Seo-Modal.js.map