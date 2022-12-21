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
const faqModal_1 = __importDefault(require("../../modal/faqModal"));
const createFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Faq.",
            });
        }
        if (!requestData.title) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq title is required.",
            });
        }
        if (!requestData.description) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq description is required.",
            });
        }
        const newFaq = new faqModal_1.default({
            author: user._id,
            title: requestData.title,
            slug: requestData.slug,
            description: requestData.description,
        });
        yield newFaq.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Faq Created successfully",
            data: newFaq,
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
const updateFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Faq details.",
            });
        }
        if (!requestData.faqId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq Id is required.",
            });
        }
        const Faq = yield faqModal_1.default.findById({
            _id: requestData.faqId,
        });
        if (!Faq) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq not found.",
            });
        }
        const data = {
            title: requestData.title,
            slug: requestData.slug,
            description: requestData.description,
        };
        yield faqModal_1.default.findByIdAndUpdate({
            _id: requestData.faqId,
        }, data);
        const result = yield faqModal_1.default.findById({
            _id: requestData.faqId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Faq Updated Successfully",
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
const deleteFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Faq.",
            });
        }
        if (!requestData.faqId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq Id is required.",
            });
        }
        const Faq = yield faqModal_1.default.findById({
            _id: requestData.faqId,
        });
        if (!Faq) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield faqModal_1.default.findByIdAndUpdate({
            _id: requestData.faqId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Faq Deleted Successfully",
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
const activateDeactiveFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Faq details.",
            });
        }
        if (!requestData.faqId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq Id is required.",
            });
        }
        const Data = yield faqModal_1.default.findById({
            _id: requestData.faqId,
        });
        if (!Data) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq not found.",
            });
        }
        const data = {
            isactive: !Data.isactive,
        };
        yield faqModal_1.default.findByIdAndUpdate({
            _id: requestData.faqId,
        }, data);
        const result = yield faqModal_1.default.findById({
            _id: requestData.faqId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Faq Status Updated Successfully",
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
const findByIdFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqId = req.params.id;
        const result = yield faqModal_1.default.findById({
            _id: faqId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Faq not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Faq Fetch Successfully",
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
const ListFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                    isactive: true,
                    $and: [
                        cond,
                        {
                            $or: [
                                { title: { $regex: search, $options: "i" } },
                                { description: { $regex: search, $options: "i" } },
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
        const result = yield faqModal_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Faq List Fetch Successfully",
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
    createFaq,
    updateFaq,
    deleteFaq,
    activateDeactiveFaq,
    findByIdFaq,
    ListFaq,
};
//# sourceMappingURL=faqController.js.map