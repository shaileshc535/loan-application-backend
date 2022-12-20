"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const seoRoutes_1 = __importDefault(require("./seoRoutes"));
const appsRoute_1 = __importDefault(require("./appsRoute"));
const loanCategoryRoutes_1 = __importDefault(require("./loanCategoryRoutes"));
const loanSubCategoryRoute_1 = __importDefault(require("./loanSubCategoryRoute"));
const loanRoute_1 = __importDefault(require("./loanRoute"));
const Router = express_1.default.Router();
Router.use("/user", userRoute_1.default);
Router.use("/seo", seoRoutes_1.default);
Router.use("/app", appsRoute_1.default);
Router.use("/category", loanCategoryRoutes_1.default);
Router.use("/subcategory", loanSubCategoryRoute_1.default);
Router.use("/loan", loanRoute_1.default);
exports.default = Router;
//# sourceMappingURL=index.js.map