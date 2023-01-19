import express from "express";
import controller from "../controller/loan category/loanCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createLoanCategory);

router.put("/edit", auth, controller.updateLoanCategory);

router.put("/delete", auth, controller.deleteLoanCategory);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveLoanCategory
);

router.get("/loan-category/:id", controller.findByIdLoanCategory);

router.post("/loan-category", controller.ListLoanCategory);

router.post("/admin/loan-category", controller.ListLoanCategoryAdmin);

export default router;
