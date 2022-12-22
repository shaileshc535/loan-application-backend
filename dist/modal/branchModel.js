"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BranchSchema = new mongoose_1.Schema({
    branch_name: {
        type: String,
        required: true,
    },
    branch_code: {
        type: String,
    },
    address: {
        type: String,
    },
    landmark: {
        type: String,
    },
    city: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "cities",
        required: true,
    },
    state: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "states",
    },
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "countries",
    },
    pincode: {
        type: String,
    },
    phone: {
        type: String,
    },
    fax: {
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
BranchSchema.virtual("cityname", {
    ref: "cities",
    localField: "city",
    foreignField: "_id",
});
BranchSchema.virtual("statename", {
    ref: "states",
    localField: "state",
    foreignField: "_id",
});
BranchSchema.virtual("countryname", {
    ref: "countries",
    localField: "country",
    foreignField: "_id",
});
const branch = (0, mongoose_1.model)("branch", BranchSchema);
exports.default = branch;
//# sourceMappingURL=branchModel.js.map