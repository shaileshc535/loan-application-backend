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
import productRoutes from "./productRoutes";
import productCategoryRoutes from "./productCategoryRoutes";
import productSubCategoryRoutes from "./productSubCategoryRoutes";
import branchRoute from "./branchRoute";
import userAccountRoutes from "./userAccountRoutes";
import accountTypeRoutes from "./accountTypeRoutes";
import transactionRoutes from "./transactionRoutes";

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

Router.use("/product", productRoutes);

Router.use("/product-category", productCategoryRoutes);

Router.use("/product-subcategory", productSubCategoryRoutes);

Router.use("/branch", branchRoute);

Router.use("/account", userAccountRoutes);

Router.use("/account-type", accountTypeRoutes);

Router.use("/transaction", transactionRoutes);

export default Router;
