"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountTypeController_1 = __importDefault(require("../controller/account-type/accountTypeController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, accountTypeController_1.default.createAccountType);
router.put("/edit", auth_middleware_1.default, accountTypeController_1.default.updateAccountType);
router.put("/delete", auth_middleware_1.default, accountTypeController_1.default.deleteAccountType);
router.put("/change-activate-status", auth_middleware_1.default, accountTypeController_1.default.activateDeactiveAccountType);
router.get("/account-type/:id", accountTypeController_1.default.findByIdAccountType);
router.post("/account-type", accountTypeController_1.default.ListAccountType);
exports.default = router;
//# sourceMappingURL=accountTypeRoutes.js.map