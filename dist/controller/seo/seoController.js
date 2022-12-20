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
const Seo_Modal_1 = __importDefault(require("../../modal/Seo-Modal"));
const createSEOTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const seo_icon_url = process.env.BASE_URL + "/public/" + req.files.seo_icon[0].filename;
        const web_icon_url = process.env.BASE_URL + "/public/" + req.files.web_icon[0].filename;
        const newSeoTag = new Seo_Modal_1.default({
            page_name: req.body.page_name,
            page_url: req.body.page_url,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            heading_tags: req.body.heading_tags,
            seo_icon: seo_icon_url,
            web_icon: web_icon_url,
        });
        yield newSeoTag.save();
        res.status(200).json({
            type: "success",
            status: 200,
            message: "SEO Tag Created successfully",
            data: newSeoTag,
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
const editSeoTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (!requestData.seoId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Seo Id is required.`,
            });
        }
        const seo_icon_url = process.env.BASE_URL + "/public/" + req.files.seo_icon[0].filename;
        const web_icon_url = process.env.BASE_URL + "/public/" + req.files.web_icon[0].filename;
        const data = {
            page_name: req.body.page_name,
            page_url: req.body.page_url,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            heading_tags: req.body.heading_tags,
            seo_icon: seo_icon_url,
            web_icon: web_icon_url,
        };
        yield Seo_Modal_1.default.findByIdAndUpdate({
            _id: requestData.seoId,
        }, data);
        const result = yield Seo_Modal_1.default.findById({ _id: requestData.seoId });
        res.status(200).json({
            status: true,
            type: "success",
            message: "SEO Tag Details Updated Successfully",
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
const deleteSeoTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const id = req.body.seoId;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Seo Id is required.`,
            });
        }
        if (user.role != "admin") {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete SEO tags.",
            });
        }
        const newData = {
            isdeleted: true,
        };
        yield Seo_Modal_1.default.findByIdAndUpdate({
            _id: id,
        }, newData);
        res.status(200).json({
            status: true,
            type: "success",
            message: "SEO Tag Deleted Successfully.",
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
const GetSeoTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        const id = req.params.seoId;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `Seo Id is required.`,
            });
        }
        const result = yield Seo_Modal_1.default.findById({ _id: id, isdeleted: false });
        res.status(200).json({
            status: 200,
            success: true,
            message: "SEO Tag Details Fetch Successfully",
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
const GetSeoTagList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                                { page_name: { $regex: search, $options: "i" } },
                                { meta_title: { $regex: search, $options: "i" } },
                                { meta_description: { $regex: search, $options: "i" } },
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
        const result = yield Seo_Modal_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "SEO Tag's Fetch Successfully",
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
    createSEOTag,
    editSeoTag,
    deleteSeoTag,
    GetSeoTagById,
    GetSeoTagList,
};
//# sourceMappingURL=seoController.js.map