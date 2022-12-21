"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StateSchema = new mongoose_1.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    country_id: {
        type: Number,
    },
    country_code: {
        type: String,
    },
    country_name: {
        type: String,
    },
    state_code: {
        type: String,
    },
    type: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
}, {
    timestamps: true,
});
const states = (0, mongoose_1.model)("states", StateSchema);
exports.default = states;
//# sourceMappingURL=stateModel.js.map