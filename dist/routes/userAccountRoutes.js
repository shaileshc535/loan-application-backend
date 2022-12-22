"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAccountController_1 = __importDefault(require("../controller/user-account/userAccountController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, userAccountController_1.default.createUserAccount);
router.put("/edit", auth_middleware_1.default, userAccountController_1.default.updateUserAccount);
router.put("/delete", auth_middleware_1.default, userAccountController_1.default.deleteUserAccount);
router.put("/change-activate-status", auth_middleware_1.default, userAccountController_1.default.activateDeactiveUserAccount);
router.get("/user-account/:id", auth_middleware_1.default, userAccountController_1.default.findByIdUserAccount);
router.post("/all-users-account", auth_middleware_1.default, userAccountController_1.default.AllUsersAccountList);
router.post("/user-account", auth_middleware_1.default, userAccountController_1.default.UserAccountsList);
exports.default = router;
//# sourceMappingURL=userAccountRoutes.js.map