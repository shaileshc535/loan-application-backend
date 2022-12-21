import express from "express";
import userRoutes from "./userRoute";
import seoRoutes from "./seoRoutes";
import appsRoute from "./appsRoute";
import loanCategoryRoutes from "./loanCategoryRoutes";
import loanSubCategoryRoute from "./loanSubCategoryRoute";
import loanRoute from "./loanRoute";
import loanCalculatorRoute from "./loanCalculatorRoute";
import blogCategoryRoutes from "./blogCategoryRoutes";
import blogRoutes from "./blogRoutes";
import faqRoutes from "./faqRoutes";
import locationRoutes from "./locationRoutes";
import userAddressRoutes from "./userAddressRoutes";

const Router = express.Router();

Router.use("/user", userRoutes);

Router.use("/seo", seoRoutes);

Router.use("/app", appsRoute);

Router.use("/loan-category", loanCategoryRoutes);

Router.use("/loan-subcategory", loanSubCategoryRoute);

Router.use("/loan", loanRoute);

Router.use("/", loanCalculatorRoute);

Router.use("/blog-category", blogCategoryRoutes);

Router.use("/blog", blogRoutes);

Router.use("/faq", faqRoutes);

Router.use("/location", locationRoutes);

Router.use("/user-address", userAddressRoutes);

export default Router;
