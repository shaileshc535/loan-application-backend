"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAddressController_1 = __importDefault(require("../controller/user-address/userAddressController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, userAddressController_1.default.createUserAddress);
router.put("/edit", auth_middleware_1.default, userAddressController_1.default.editUserAddress);
router.put("/delete", auth_middleware_1.default, userAddressController_1.default.deleteUserAddress);
router.put("/change-activate-status", auth_middleware_1.default, userAddressController_1.default.activateDeactiveUserAddress);
router.get("/address/:id", auth_middleware_1.default, userAddressController_1.default.GetUserAddressById);
router.post("/address", userAddressController_1.default.GetUserAddressList);
exports.default = router;
//# sourceMappingURL=userAddressRoutes.js.map