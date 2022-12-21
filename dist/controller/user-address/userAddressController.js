"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAddressModel_1 = __importDefault(require("../../modal/userAddressModel"));
// import mongoose from "mongoose";
// const ObjectId = <any>mongoose.Types.ObjectId;
const createUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (!user) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "User details are Required.",
            });
        }
        const requestedData = req.body;
        if (!requestedData.address) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "Address is Required.",
            });
        }
        if (!requestedData.city) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "City is Required.",
            });
        }
        const newUserAddress = new userAddressModel_1.default({
            user_id: user._id,
            contact_person: requestedData.contact_person,
            phonecode: requestedData.phonecode,
            house_no: requestedData.house_no,
            street: requestedData.street,
            address: requestedData.address,
            landmark: requestedData.landmark,
            city: requestedData.city,
            state: requestedData.state,
            country: requestedData.country,
            pincode: requestedData.pincode,
            type: requestedData.type,
        });
        yield newUserAddress.save();
        res.status(200).json({
            type: "success",
            status: 200,
            message: "User Address Saved successfully",
            data: newUserAddress,
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const editUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestedData = req.body;
        if (!requestedData.addressId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Address Id is required.`,
            });
        }
        const address = yield userAddressModel_1.default.findById({
            _id: requestedData.addressId,
            user_id: user._id,
        });
        if (!address) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `User Address not found.`,
            });
        }
        const data = {
            contact_person: requestedData.contact_person,
            phonecode: requestedData.phonecode,
            house_no: requestedData.house_no,
            street: requestedData.street,
            address: requestedData.address,
            landmark: requestedData.landmark,
            city: requestedData.city,
            state: requestedData.state,
            country: requestedData.country,
            pincode: requestedData.pincode,
            type: requestedData.type,
        };
        yield userAddressModel_1.default.findByIdAndUpdate({
            _id: requestedData.addressId,
        }, data);
        const result = yield userAddressModel_1.default.findById({
            _id: requestedData.addressId,
        });
        res.status(200).json({
            status: true,
            type: "success",
            message: "User Address Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const deleteUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const id = req.body.addressId;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Address id is required.`,
            });
        }
        const result = yield userAddressModel_1.default.findById({
            _id: id,
            user_id: user._id,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `User Address not found.`,
            });
        }
        const newData = {
            isdeleted: true,
        };
        yield userAddressModel_1.default.findByIdAndUpdate({
            _id: id,
        }, newData);
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Address Deleted Successfully.",
            data: "",
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const activateDeactiveUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const id = req.body.addressId;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Address id is required.`,
            });
        }
        const address = yield userAddressModel_1.default.findById({
            _id: id,
            user_id: user._id,
        });
        if (!address) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `User Address not found.`,
            });
        }
        const data = {
            isactive: !address.isactive,
        };
        yield userAddressModel_1.default.findByIdAndUpdate({
            _id: id,
        }, data);
        const result = yield userAddressModel_1.default.findById({
            _id: id,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "User Address activation Status changed Successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const GetUserAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Seo Id is required.`,
            });
        }
        const address = yield userAddressModel_1.default.findById({
            _id: id,
            user_id: user._id,
        });
        if (!address) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Address not forund.`,
            });
        }
        const result = yield userAddressModel_1.default
            .findById({
            _id: id,
            isdeleted: false,
            isactive: true,
        })
            .populate("user_id")
            .populate("city")
            .populate("state")
            .populate("country");
        res.status(200).json({
            status: 200,
            success: true,
            message: "Address Details Fetch Successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
const GetUserAddressList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        let { page, limit, sort, cond } = req.body;
        if (user) {
            cond = Object.assign({ user_id: user._id, isdeleted: false }, cond);
        }
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        if (!cond) {
            cond = {};
        }
        if (!sort) {
            sort = { createdAt: -1 };
        }
        limit = parseInt(limit);
        const result = yield userAddressModel_1.default
            .find(cond)
            .populate("user_id")
            .populate("city")
            .populate("state")
            .populate("country")
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield userAddressModel_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "User Address Fetch Successfully",
            page: page,
            limit: limit,
            totalPages: totalPages,
            total: result_count,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            success: false,
            errors: error,
            msg: "Something went wrong. Please try again",
        });
    }
});
exports.default = {
    createUserAddress,
    editUserAddress,
    deleteUserAddress,
    activateDeactiveUserAddress,
    GetUserAddressById,
    GetUserAddressList,
};
//# sourceMappingURL=userAddressController.js.map