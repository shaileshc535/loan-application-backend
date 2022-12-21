"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogCategoryController_1 = __importDefault(require("../controller/blog-category/blogCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, blogCategoryController_1.default.createBlogCategory);
router.put("/edit", auth_middleware_1.default, blogCategoryController_1.default.updateBlogCategory);
router.put("/delete", auth_middleware_1.default, blogCategoryController_1.default.deleteBlogCategory);
router.put("/change-activate-status", auth_middleware_1.default, blogCategoryController_1.default.activateDeactiveBlogCategory);
router.get("/blog-category/:id", blogCategoryController_1.default.findByIdBlogCategory);
router.post("/blog-category", blogCategoryController_1.default.ListBlogCategory);
exports.default = router;
//# sourceMappingURL=blogCategoryRoutes.js.map