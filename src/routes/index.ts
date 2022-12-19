import express from "express";
import userRoutes from "./userRoute";
import seoRoutes from "./seoRoutes";

const Router = express.Router();

Router.use("/user", userRoutes);

Router.use("/seo", seoRoutes);

export default Router;
