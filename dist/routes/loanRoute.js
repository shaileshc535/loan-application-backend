"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanController_1 = __importDefault(require("../controller/Loan/loanController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create-loan", auth_middleware_1.default, loanController_1.default.createLoan);
router.post("/edit-loan", auth_middleware_1.default, loanController_1.default.updateLoan);
router.post("/delete-loan", auth_middleware_1.default, loanController_1.default.deleteLoan);
router.post("/activate-loan", auth_middleware_1.default, loanController_1.default.activateDeactiveLoan);
router.get("/loan/:id", loanController_1.default.findByIdLoan);
router.post("/loan-list", loanController_1.default.ListLoan);
router.post("/calculate", loanController_1.default.LoanCalculator);
exports.default = router;
//# sourceMappingURL=loanRoute.js.map