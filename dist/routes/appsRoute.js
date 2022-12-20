"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appsController_1 = __importDefault(require("../controller/apps/appsController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create-app", auth_middleware_1.default, appsController_1.default.CreateApp);
router.post("/edit-app", auth_middleware_1.default, appsController_1.default.EditApp);
router.post("/delete-app", auth_middleware_1.default, appsController_1.default.DeleteApp);
router.get("/get-app/:appId", auth_middleware_1.default, appsController_1.default.GetAppById);
router.post("/get-app", auth_middleware_1.default, appsController_1.default.GetAppsList);
exports.default = router;
//# sourceMappingURL=appsRoute.js.map