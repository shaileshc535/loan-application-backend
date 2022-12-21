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
const blogController_1 = __importDefault(require("../controller/blogs/blogController"));
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
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, callback) {
        callback(null, true);
    },
}).single("main_image");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.default, upload, blogController_1.default.createBlog);
router.put("/edit", auth_middleware_1.default, upload, blogController_1.default.updateBlog);
router.put("/delete", auth_middleware_1.default, blogController_1.default.deleteBlog);
router.put("/change-activate-status", auth_middleware_1.default, blogController_1.default.activateDeactiveBlog);
router.get("/blog/:id", blogController_1.default.findByIdBlog);
router.post("/blogs", blogController_1.default.ListBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map