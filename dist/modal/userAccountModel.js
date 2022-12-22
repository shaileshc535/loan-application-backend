"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserAccountSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    user_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user_address",
    },
    account_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "account_type",
    },
    branch_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "branch",
    },
    account_no: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
    },
    transction_amount: {
        type: Number,
    },
    transction_id: {
        type: String,
    },
    transction_type: {
        type: String,
    },
    transction_date: {
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
UserAccountSchema.virtual("user", {
    ref: "user",
    localField: "user_id",
    foreignField: "_id",
});
UserAccountSchema.virtual("user_address", {
    ref: "user_address",
    localField: "user_address_id",
    foreignField: "_id",
});
UserAccountSchema.virtual("accountType", {
    ref: "account_type",
    localField: "account_type",
    foreignField: "_id",
});
UserAccountSchema.virtual("branch", {
    ref: "branch",
    localField: "branch_id",
    foreignField: "_id",
});
const user_account = (0, mongoose_1.model)("user_account", UserAccountSchema);
exports.default = user_account;
//# sourceMappingURL=userAccountModel.js.map