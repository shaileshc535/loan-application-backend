"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanController_1 = __importDefault(require("../controller/Loan/loanController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, loanController_1.default.createLoan);
router.put("/edit", auth_middleware_1.default, loanController_1.default.updateLoan);
router.put("/delete", auth_middleware_1.default, loanController_1.default.deleteLoan);
router.put("/change-activate-status", auth_middleware_1.default, loanController_1.default.activateDeactiveLoan);
router.get("/loan/:id", loanController_1.default.findByIdLoan);
router.post("/loan", loanController_1.default.ListLoan);
exports.default = router;
//# sourceMappingURL=loanRoute.js.map