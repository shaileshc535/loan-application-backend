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
const Apps_Modal_1 = __importDefault(require("../../modal/Apps-Modal"));
const CreateApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        const newApp = new Apps_Modal_1.default({
            name: requestData.name,
            slug: requestData.slug,
            privacy_policy: requestData.privacy_policy,
            permission: requestData.permission,
            roles: requestData.roles,
        });
        yield newApp.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "New App Created successfully",
            data: newApp,
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
const EditApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        const data = {
            name: requestData.name,
            slug: requestData.slug,
            privacy_policy: requestData.privacy_policy,
            permission: requestData.permission,
            roles: requestData.roles,
        };
        yield Apps_Modal_1.default.findByIdAndUpdate({
            _id: requestData.appId,
        }, data);
        const result = yield Apps_Modal_1.default.findById({ _id: requestData.appId });
        res.status(200).json({
            status: 200,
            success: true,
            message: "App Details Updated Successfully",
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
const DeleteApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const id = req.body.appId;
        if (user.role != "admin") {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Apps.",
            });
        }
        const newData = {
            isdeleted: true,
        };
        yield Apps_Modal_1.default.findByIdAndUpdate({
            _id: id,
        }, newData);
        res.status(200).json({
            status: 200,
            success: true,
            message: "App Deleted Successfully.",
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
const GetAppById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const id = req.params.appId;
        const result = yield Apps_Modal_1.default.findById({ _id: id, isdeleted: false });
        res.status(200).json({
            status: 200,
            success: true,
            message: "App Details Fetch Successfully",
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
const GetAppsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        let { page, limit, sort, cond } = req.body;
        let search = "";
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit) {
            limit = 9;
        }
        if (!cond) {
            cond = {};
        }
        if (!sort) {
            sort = { createdAt: -1 };
        }
        if (typeof cond.search != "undefined" && cond.search != null) {
            search = String(cond.search);
            delete cond.search;
        }
        cond = [
            {
                $match: {
                    isdeleted: false,
                    $and: [
                        cond,
                        {
                            $or: [
                                { name: { $regex: search, $options: "i" } },
                                { slug: { $regex: search, $options: "i" } },
                            ],
                        },
                    ],
                },
            },
            { $sort: sort },
            {
                $facet: {
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                    total: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ];
        limit = parseInt(limit);
        const result = yield Apps_Modal_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Apps List Fetch Successfully",
            page: page,
            limit: limit,
            totalPages: totalPages,
            total: result[0].total.length != 0 ? result[0].total[0].count : 0,
            data: result[0].data,
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
    CreateApp,
    EditApp,
    DeleteApp,
    GetAppById,
    GetAppsList,
};
//# sourceMappingURL=appsController.js.map