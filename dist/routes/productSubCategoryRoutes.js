"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productSubCategoryController_1 = __importDefault(require("../controller/product-subcategory/productSubCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, productSubCategoryController_1.default.createProductSubCategory);
router.put("/edit", auth_middleware_1.default, productSubCategoryController_1.default.updateProductSubCategory);
router.put("/delete", auth_middleware_1.default, productSubCategoryController_1.default.deleteProductSubCategory);
router.put("/change-activate-status", auth_middleware_1.default, productSubCategoryController_1.default.activateDeactiveProductSubCategory);
router.get("/product-subcategory/:id", productSubCategoryController_1.default.findByIdProductSubCategory);
router.post("/product-subcategory", productSubCategoryController_1.default.ListProductSubCategory);
exports.default = router;
//# sourceMappingURL=productSubCategoryRoutes.js.map