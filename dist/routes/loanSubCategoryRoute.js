"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanSubCategoryController_1 = __importDefault(require("../controller/loan subcategory/loanSubCategoryController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create-loan-subcategory", auth_middleware_1.default, loanSubCategoryController_1.default.createLoanSubCategory);
router.post("/edit-loan-subcategory", auth_middleware_1.default, loanSubCategoryController_1.default.updateLoanSubCategory);
router.post("/delete-loan-subcategory", auth_middleware_1.default, loanSubCategoryController_1.default.deleteLoanSubCategory);
router.post("/activate-loan-subcategory", auth_middleware_1.default, loanSubCategoryController_1.default.activateDeactiveLoanSubCategory);
router.get("/loan-subcategory/:id", loanSubCategoryController_1.default.findByIdLoanSubCategory);
router.post("/loan-subcategory-list", loanSubCategoryController_1.default.ListLoanSubCategory);
exports.default = router;
//# sourceMappingURL=loanSubCategoryRoute.js.map