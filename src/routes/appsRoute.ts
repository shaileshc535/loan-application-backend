import express from "express";
import controller from "../controller/apps/appsController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create-app", auth, controller.CreateApp);

router.post("/edit-app", auth, controller.EditApp);

router.post("/delete-app", auth, controller.DeleteApp);

router.get("/get-app/:appId", auth, controller.GetAppById);

router.post("/get-app", auth, controller.GetAppsList);

export default router;
