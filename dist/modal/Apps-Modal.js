"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    permission: [{ type: String }],
    roles: [{ type: String }],
    privacy_policy: {
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
const apps = (0, mongoose_1.model)("apps", AppSchema);
exports.default = apps;
//# sourceMappingURL=Apps-Modal.js.map