"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appsController_1 = __importDefault(require("../controller/apps/appsController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, appsController_1.default.CreateApp);
router.put("/edit", auth_middleware_1.default, appsController_1.default.EditApp);
router.put("/delete", auth_middleware_1.default, appsController_1.default.DeleteApp);
router.put("/change-activate-status", auth_middleware_1.default, appsController_1.default.activateDeactiveApp);
router.get("/app/:appId", appsController_1.default.GetAppById);
router.post("/app-list", appsController_1.default.GetAppsList);
exports.default = router;
//# sourceMappingURL=appsRoute.js.map