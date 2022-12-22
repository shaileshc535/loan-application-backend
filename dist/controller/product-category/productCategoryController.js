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
const productCategoryModel_1 = __importDefault(require("../../modal/productCategoryModel"));
const createProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Product category.",
            });
        }
        if (!requestData.name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category name is required.",
            });
        }
        const newProductCategory = new productCategoryModel_1.default({
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        });
        yield newProductCategory.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Created successfully",
            data: newProductCategory,
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
const updateProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Product category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is requireds.",
            });
        }
        const categoryData = yield productCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        };
        yield productCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield productCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Updated Successfully",
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
const deleteProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to delete Product category.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is required.",
            });
        }
        const categoryData = yield productCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield productCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Deleted Successfully",
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
const activateDeactiveProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Product category details.",
            });
        }
        if (!requestData.categoryId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category Id is required.",
            });
        }
        const categoryData = yield productCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        if (!categoryData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        const data = {
            isactive: !categoryData.isactive,
        };
        yield productCategoryModel_1.default.findByIdAndUpdate({
            _id: requestData.categoryId,
        }, data);
        const result = yield productCategoryModel_1.default.findById({
            _id: requestData.categoryId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Status Updated Successfully",
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
const findByIdProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield productCategoryModel_1.default.findById({
            _id: categoryId,
            isdeleted: false,
            isactive: true,
        });
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Fetch Successfully",
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
const ListProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        let { page, limit, sort, cond } = req.body;
        cond = Object.assign({ isdeleted: false }, cond);
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
        const result = yield productCategoryModel_1.default.find(cond)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield productCategoryModel_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Product Category Fetch Successfully",
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
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    activateDeactiveProductCategory,
    findByIdProductCategory,
    ListProductCategory,
};
//# sourceMappingURL=productCategoryController.js.map