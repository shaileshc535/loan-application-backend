"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controller/user/login.controller"));
const register_controller_1 = __importDefault(require("../controller/user/register.controller"));
const Password_controller_1 = __importDefault(require("../controller/user/Password.controller"));
const permission_controller_1 = __importDefault(require("../controller/user/permission.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.use("/register", register_controller_1.default);
router.post("/login", login_controller_1.default);
router.post("/forgotPass", Password_controller_1.default.forgotPassword);
router.post("/password-reset/:userId/:token", Password_controller_1.default.resetPassword);
router.post("/forgot-reset-password", Password_controller_1.default.changeTempPassword);
router.post("/password-change", auth_middleware_1.default, Password_controller_1.default.changePassword);
router.post("/list-users", auth_middleware_1.default, Password_controller_1.default.ListAllUsers);
router.post("/activate-users", auth_middleware_1.default, permission_controller_1.default.ActivateUser);
router.post("/user-role-update", auth_middleware_1.default, permission_controller_1.default.userRollUpdate);
router.post("/user-app-update", auth_middleware_1.default, permission_controller_1.default.userAppsUpdate);
router.post("/user-email-verify", auth_middleware_1.default, permission_controller_1.default.UserEmailVerify);
router.post("/user-phone-verify", auth_middleware_1.default, permission_controller_1.default.UserPhoneVerify);
router.post("/user-permission-update", auth_middleware_1.default, permission_controller_1.default.userPermissionsUpdate);
router.post("/send-phone-otp", permission_controller_1.default.SendPhoneOTP);
exports.default = router;
//# sourceMappingURL=userRoute.js.map