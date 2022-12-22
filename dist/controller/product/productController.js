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
const productModel_1 = __importDefault(require("../../modal/productModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to create Product.",
            });
        }
        if (!requestData.product_category_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product Category is required.",
            });
        }
        if (!requestData.product_sub_category_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product Sub Category is required.",
            });
        }
        const newProduct = new productModel_1.default({
            product_category_id: requestData.product_category_id,
            product_sub_category_id: requestData.product_sub_category_id,
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        });
        yield newProduct.save();
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Created successfully",
            data: newProduct,
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Product details.",
            });
        }
        if (!requestData.productId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product Id is required.",
            });
        }
        const productData = yield productModel_1.default.findById({
            _id: requestData.productId,
        });
        if (!productData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product details not found.",
            });
        }
        const data = {
            product_category_id: requestData.categoryId,
            product_sub_category_id: requestData.subCategoryId,
            name: requestData.name,
            slug: requestData.slug,
            description: requestData.description,
        };
        yield productModel_1.default.findByIdAndUpdate({
            _id: requestData.productId,
        }, data);
        const result = yield productModel_1.default.findById({
            _id: requestData.productId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Details Updated Successfully",
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Product details.",
            });
        }
        if (!requestData.productId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product Id is required.",
            });
        }
        const ProductData = yield productModel_1.default.findById({
            _id: requestData.productId,
        });
        if (!ProductData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product details not found.",
            });
        }
        const data = {
            isdeleted: true,
        };
        yield productModel_1.default.findByIdAndUpdate({
            _id: requestData.productId,
        }, data);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Deleted Successfully",
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
const activateDeactiveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        const requestData = req.body;
        if (user.role != "admin") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You are not authorise to update Product details.",
            });
        }
        if (!requestData.productId) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product Id is required.",
            });
        }
        const ProductData = yield productModel_1.default.findById({
            _id: requestData.productId,
        });
        if (!ProductData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product details not found.",
            });
        }
        const data = {
            isactive: !ProductData.isactive,
        };
        yield productModel_1.default.findByIdAndUpdate({
            _id: requestData.productId,
        }, data);
        const result = yield productModel_1.default.findById({
            _id: requestData.productId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product Status updated Successfully",
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
const findByIdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield productModel_1.default.findById({
            _id: productId,
            isdeleted: false,
            isactive: true,
        })
            .populate("product_category_id")
            .populate("product_sub_category_id");
        if (!result) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product details not found.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product details fetch successfully",
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
const ListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = JSON.parse(JSON.stringify(req.user));
        let { page, limit, sort, cond } = req.body;
        // if (user) {
        cond = Object.assign({ isactive: true, isdeleted: false }, cond);
        // }
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
        const result = yield productModel_1.default.find(cond)
            .populate("product_category_id")
            .populate("product_sub_category_id")
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const result_count = yield productModel_1.default.find(cond).count();
        const totalPages = Math.ceil(result_count / limit);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Product Fetch Successfully",
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
    createProduct,
    updateProduct,
    deleteProduct,
    activateDeactiveProduct,
    findByIdProduct,
    ListProduct,
};
//# sourceMappingURL=productController.js.map