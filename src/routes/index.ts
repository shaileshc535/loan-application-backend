import express from "express";
import userRoutes from "./userRoute";
import seoRoutes from "./seoRoutes";
import appsRoute from "./appsRoute";
import loanCategoryRoutes from "./loanCategoryRoutes";
import loanSubCategoryRoute from "./loanSubCategoryRoute";
import loanRoute from "./loanRoute";

const Router = express.Router();

Router.use("/user", userRoutes);

Router.use("/seo", seoRoutes);

Router.use("/app", appsRoute);

Router.use("/category", loanCategoryRoutes);

Router.use("/subcategory", loanSubCategoryRoute);

Router.use("/loan", loanRoute);

export default Router;
