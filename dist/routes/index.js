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
const loanCalculatorRoute_1 = __importDefault(require("./loanCalculatorRoute"));
const blogCategoryRoutes_1 = __importDefault(require("./blogCategoryRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const faqRoutes_1 = __importDefault(require("./faqRoutes"));
const locationRoutes_1 = __importDefault(require("./locationRoutes"));
const userAddressRoutes_1 = __importDefault(require("./userAddressRoutes"));
const Router = express_1.default.Router();
Router.use("/user", userRoute_1.default);
Router.use("/seo", seoRoutes_1.default);
Router.use("/app", appsRoute_1.default);
Router.use("/loan-category", loanCategoryRoutes_1.default);
Router.use("/loan-subcategory", loanSubCategoryRoute_1.default);
Router.use("/loan", loanRoute_1.default);
Router.use("/", loanCalculatorRoute_1.default);
Router.use("/blog-category", blogCategoryRoutes_1.default);
Router.use("/blog", blogRoutes_1.default);
Router.use("/faq", faqRoutes_1.default);
Router.use("/location", locationRoutes_1.default);
Router.use("/user-address", userAddressRoutes_1.default);
exports.default = Router;
//# sourceMappingURL=index.js.map