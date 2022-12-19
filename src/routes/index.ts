import express from "express";
import userRoutes from "./userRoute";

const Router = express.Router();

Router.use("/user", userRoutes);

export default Router;
