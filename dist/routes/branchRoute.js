"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const branchController_1 = __importDefault(require("../controller/branch/branchController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, branchController_1.default.createBranch);
router.put("/edit", auth_middleware_1.default, branchController_1.default.updateBranch);
router.put("/delete", auth_middleware_1.default, branchController_1.default.deleteBranch);
router.put("/change-activate-status", auth_middleware_1.default, branchController_1.default.activateDeactiveBranch);
router.get("/branch/:id", branchController_1.default.findByIdBranch);
router.post("/branch", branchController_1.default.ListBranch);
exports.default = router;
//# sourceMappingURL=branchRoute.js.map