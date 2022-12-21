import express from "express";
import controller from "../controller/apps/appsController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.CreateApp);

router.put("/edit", auth, controller.EditApp);

router.put("/delete", auth, controller.DeleteApp);

router.put("/change-activate-status", auth, controller.activateDeactiveApp);

router.get("/app/:appId", controller.GetAppById);

router.post("/app-list", controller.GetAppsList);

export default router;
