"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/product/productController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, productController_1.default.createProduct);
router.put("/edit", auth_middleware_1.default, productController_1.default.updateProduct);
router.put("/delete", auth_middleware_1.default, productController_1.default.deleteProduct);
router.put("/change-activate-status", auth_middleware_1.default, productController_1.default.activateDeactiveProduct);
router.get("/product/:id", productController_1.default.findByIdProduct);
router.post("/product", productController_1.default.ListProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map