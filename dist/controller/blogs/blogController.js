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
const blogsModel_1 = __importDefault(require("../../modal/blogsModel"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Blog.",
            });
        }
        if (!requestData.title) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog title is required.",
            });
        }
        const base_url = process.env.BASE_URL;
        const file_url = base_url + "/public/" + req.file.filename;
        const newBlog = new blogsModel_1.default({
            author: user._id,
            category: requestData.category,
            title: requestData.title,
            slug: requestData.slug,
            description: requestData.description,
            summary: requestData.summary,
            main_image: file_url,
        });
        yield newBlog.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog Created successfully",
            data: newBlog,
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
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Blog details.",
            });
        }
        if (!requestData.blogId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog Id is required.",
            });
        }
        const blog = yield blogsModel_1.default.findById({
            _id: requestData.blogId,
        });
        if (!blog) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog not found.",
            });
        }
        const base_url = process.env.BASE_URL;
        const file_url = base_url + "/public/" + req.file.filename;
        const data = {
            category: requestData.category,
            title: requestData.title,
            slug: requestData.slug,
            description: requestData.description,
            summary: requestData.summary,
            main_image: file_url,
        };
        yield blogsModel_1.default.findByIdAndUpdate({
            _id: requestData.blogId,
        }, data);
        const result = yield blogsModel_1.default.findById({
            _id: requestData.blogId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog Updated Successfully",
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
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Blog.",
            });
        }
        if (!requestData.blogId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog Id is required.",
            });
        }
        const blog = yield blogsModel_1.default.findById({
            _id: requestData.blogId,
        });
        if (!blog) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield blogsModel_1.default.findByIdAndUpdate({
            _id: requestData.blogId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog Deleted Successfully",
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
const activateDeactiveBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Blog details.",
            });
        }
        if (!requestData.blogId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog Id is required.",
            });
        }
        const Data = yield blogsModel_1.default.findById({
            _id: requestData.blogId,
        });
        if (!Data) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog not found.",
            });
        }
        const data = {
            isactive: !Data.isactive,
        };
        yield blogsModel_1.default.findByIdAndUpdate({
            _id: requestData.blogId,
        }, data);
        const result = yield blogsModel_1.default.findById({
            _id: requestData.blogId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog Status Updated Successfully",
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
const findByIdBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const result = yield blogsModel_1.default.findById({
            _id: blogId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog Fetch Successfully",
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
const ListBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                                { summary: { $regex: search, $options: "i" } },
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
        const result = yield blogsModel_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Blog List Fetch Successfully",
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
    createBlog,
    updateBlog,
    deleteBlog,
    activateDeactiveBlog,
    findByIdBlog,
    ListBlog,
};
//# sourceMappingURL=blogController.js.map