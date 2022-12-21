import express from "express";
import controller from "../controller/faq/faqController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createFaq);

router.put("/edit", auth, controller.updateFaq);

router.put("/delete", auth, controller.deleteFaq);

router.put("/change-activate-status", auth, controller.activateDeactiveFaq);

router.get("/faq/:id", controller.findByIdFaq);

router.post("/faq", controller.ListFaq);

export default router;
