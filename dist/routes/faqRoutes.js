"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faqController_1 = __importDefault(require("../controller/faq/faqController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, faqController_1.default.createFaq);
router.put("/edit", auth_middleware_1.default, faqController_1.default.updateFaq);
router.put("/delete", auth_middleware_1.default, faqController_1.default.deleteFaq);
router.put("/change-activate-status", auth_middleware_1.default, faqController_1.default.activateDeactiveFaq);
router.get("/faq/:id", faqController_1.default.findByIdFaq);
router.post("/faq", faqController_1.default.ListFaq);
exports.default = router;
//# sourceMappingURL=faqRoutes.js.map