"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanCalculatorController_1 = __importDefault(require("../controller/loan-calculator/loanCalculatorController"));
// import auth from "../middlewares/auth.middleware";
const router = express_1.default.Router();
router.post("/calculate", loanCalculatorController_1.default.LoanCalculator);
exports.default = router;
//# sourceMappingURL=loanCalculatorRoute.js.map