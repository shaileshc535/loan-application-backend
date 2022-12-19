"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const seoRoutes_1 = __importDefault(require("./seoRoutes"));
const Router = express_1.default.Router();
Router.use("/user", userRoute_1.default);
Router.use("/seo", seoRoutes_1.default);
exports.default = Router;
//# sourceMappingURL=index.js.map