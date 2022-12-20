"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
    GenderEnum["OTHER"] = "other";
})(GenderEnum || (GenderEnum = {}));
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["ADMIN"] = "admin";
    RolesEnum["MANAGER"] = "manager";
    RolesEnum["EMPLOYEE"] = "employee";
    RolesEnum["USER"] = "user";
})(RolesEnum || (RolesEnum = {}));
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true, minlength: 2, maxlength: 50 },
    midname: { type: String, required: false, maxlength: 50 },
    lastname: { type: String, required: false, maxlength: 50 },
    fullname: { type: String },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: "Email is not a valid Email",
        },
        required: true,
    },
    phone: { type: Number },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!.%*?&]{6,}$/.test(value);
            },
            message: "{VALUE} is not a valid password",
        },
    },
    role: { type: String, enum: RolesEnum },
    gender: { type: String, enum: GenderEnum },
    dob: {
        type: String,
        validate: {
            validator: (value) => {
                return validator_1.default.isDate(value, {
                    format: "YYYY/MM/DD",
                });
            },
            message: "{VALUE} is not a valid date",
        },
    },
    profile_photo: { type: String },
    is_active: { type: Boolean, default: true },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    default_app_name: { type: String, default: "free app" },
    activation_date: { type: Date, default: Date.now() },
    apps: [
        {
            app_name: { type: String },
        },
    ],
    permissions: [
        {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
        },
    ],
}, {
    timestamps: true,
});
userSchema
    .virtual("name")
    .get(function () {
    return `${this.firstname} ${this.midname} ${this.lastname}`;
});
userSchema.virtual("userApps", {
    ref: "apps",
    localField: "apps.app_name",
    foreignField: "_id",
    justOne: true,
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    bcryptjs_1.default.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
    user.email = user.email.toLowerCase();
    user.fullname = user.firstname + " " + user.midname + " " + user.lastname;
});
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
userSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcryptjs_1.default.compareSync(password, user.password);
};
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map