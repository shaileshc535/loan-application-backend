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
const blogCategoryModel_1 = __importDefault(require("../../modal/blogCategoryModel"));
const createBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Blog category.",
            });
        }
        if (!requestData.name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category name is required.",
            });
        }
        const newBlogCategory = new blogCategoryModel_1.default({
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        });
        yield newBlogCategory.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category Created successfully",
            data: newBlogCategory,
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
const updateBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Blog-category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category Id is requireds.",
            });
        }
        const categoryData = yield blogCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category not found.",
            });
        }
        const data = {
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        };
        yield blogCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield blogCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category Updated Successfully",
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
const deleteBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Blog-category.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category Id is required.",
            });
        }
        const categoryData = yield blogCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield blogCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category Deleted Successfully",
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
const activateDeactiveBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Blog-category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category Id is required.",
            });
        }
        const categoryData = yield blogCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category not found.",
            });
        }
        const data = {
            isactive: !categoryData.isactive,
        };
        yield blogCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield blogCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category Status Updated Successfully",
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
const findByIdBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield blogCategoryModel_1.default.findById({
            _id: categoryId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blog-Category not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category Fetch Successfully",
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
const ListBlogCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                            $or: [{ name: { $regex: search, $options: "i" } }],
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
        const result = yield blogCategoryModel_1.default.aggregate(cond);
        let totalPages = 0;
        if (result[0].total.length != 0) {
            totalPages = Math.ceil(result[0].total[0].count / limit);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Blog-Category List Fetch Successfully",
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
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    activateDeactiveBlogCategory,
    findByIdBlogCategory,
    ListBlogCategory,
};
//# sourceMappingURL=blogCategoryController.js.map