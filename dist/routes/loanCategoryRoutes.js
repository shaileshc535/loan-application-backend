"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanCategoryController_1 = __importDefault(require("../controller/loan category/loanCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create-loan-category", auth_middleware_1.default, loanCategoryController_1.default.createLoanCategory);
router.post("/edit-loan-category", auth_middleware_1.default, loanCategoryController_1.default.updateLoanCategory);
router.post("/delete-loan-category", auth_middleware_1.default, loanCategoryController_1.default.deleteLoanCategory);
router.post("/activate-loan-category", auth_middleware_1.default, loanCategoryController_1.default.activateDeactiveLoanCategory);
router.get("/loan-category/:id", loanCategoryController_1.default.findByIdLoanCategory);
router.post("/loan-category-list", loanCategoryController_1.default.ListLoanCategory);
exports.default = router;
//# sourceMappingURL=loanCategoryRoutes.js.map