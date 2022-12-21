"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanCategoryController_1 = __importDefault(require("../controller/loan category/loanCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, loanCategoryController_1.default.createLoanCategory);
router.put("/edit", auth_middleware_1.default, loanCategoryController_1.default.updateLoanCategory);
router.put("/delete", auth_middleware_1.default, loanCategoryController_1.default.deleteLoanCategory);
router.put("/change-activate-status", auth_middleware_1.default, loanCategoryController_1.default.activateDeactiveLoanCategory);
router.get("/loan-category/:id", loanCategoryController_1.default.findByIdLoanCategory);
router.post("/loan-category", loanCategoryController_1.default.ListLoanCategory);
exports.default = router;
//# sourceMappingURL=loanCategoryRoutes.js.map