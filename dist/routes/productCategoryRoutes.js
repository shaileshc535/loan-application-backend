"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productCategoryController_1 = __importDefault(require("../controller/product-category/productCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, productCategoryController_1.default.createProductCategory);
router.put("/edit", auth_middleware_1.default, productCategoryController_1.default.updateProductCategory);
router.put("/delete", auth_middleware_1.default, productCategoryController_1.default.deleteProductCategory);
router.put("/change-activate-status", auth_middleware_1.default, productCategoryController_1.default.activateDeactiveProductCategory);
router.get("/product-category/:id", productCategoryController_1.default.findByIdProductCategory);
router.post("/product-category", productCategoryController_1.default.ListProductCategory);
exports.default = router;
//# sourceMappingURL=productCategoryRoutes.js.map