"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seoController_1 = __importDefault(require("../controller/seo/seoController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = require("fs-extra");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, fs_extra_1.ensureDir)("./public/");
            cb(null, "./public/");
        });
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const datetimestamp = Date.now();
        cb(null, file.fieldname + "-" + datetimestamp + "." + ext);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const seoTagMulterUpload = upload.fields([
    { name: "seo_icon", maxCount: 1 },
    { name: "web_icon", maxCount: 1 },
]);
const router = express_1.default.Router();
router.post("/create-seo-tag", auth_middleware_1.default, seoTagMulterUpload, seoController_1.default.createSEOTag);
router.post("/edit-seo-tag", auth_middleware_1.default, seoTagMulterUpload, seoController_1.default.editSeoTag);
router.post("/delete-seo-tag", auth_middleware_1.default, seoController_1.default.deleteSeoTag);
router.get("/get-seo-tag/:seoId", auth_middleware_1.default, seoController_1.default.GetSeoTagById);
router.post("/get-seo-tag", auth_middleware_1.default, seoController_1.default.GetSeoTagList);
exports.default = router;
//# sourceMappingURL=seoRoutes.js.map