import express from "express";
import userRoutes from "./userRoute";
import seoRoutes from "./seoRoutes";
import appsRoute from "./appsRoute";

const Router = express.Router();

Router.use("/user", userRoutes);

Router.use("/seo", seoRoutes);

Router.use("/app", appsRoute);

export default Router;
