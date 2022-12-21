"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var AddressTypeEnum;
(function (AddressTypeEnum) {
    AddressTypeEnum["HOME"] = "home";
    AddressTypeEnum["OFFICE"] = "office";
    AddressTypeEnum["OTHER"] = "other";
})(AddressTypeEnum || (AddressTypeEnum = {}));
const UserAddressSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    contact_person: {
        firstname: {
            type: String,
        },
        midname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        phone: {
            type: String,
        },
        alternate_phone: {
            type: String,
        },
    },
    phonecode: {
        type: String,
    },
    house_no: {
        type: String,
    },
    street: {
        type: String,
    },
    address: {
        type: String,
        required: true,
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
    type: {
        type: String,
        enum: AddressTypeEnum,
    },
    isactive: {
        type: Boolean,
        default: true,
    },
    isprimary: {
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
UserAddressSchema.virtual("user", {
    ref: "user",
    localField: "user_id",
    foreignField: "_id",
});
UserAddressSchema.virtual("cityname", {
    ref: "cities",
    localField: "city",
    foreignField: "_id",
});
UserAddressSchema.virtual("statename", {
    ref: "states",
    localField: "state",
    foreignField: "_id",
});
UserAddressSchema.virtual("countryname", {
    ref: "countries",
    localField: "country",
    foreignField: "_id",
});
const user_address = (0, mongoose_1.model)("user_address", UserAddressSchema);
exports.default = user_address;
//# sourceMappingURL=userAddressModel.js.map