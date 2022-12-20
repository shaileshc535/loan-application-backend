import express from "express";
import controller from "../controller/loan category/loanCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create-loan-category", auth, controller.createLoanCategory);

router.post("/edit-loan-category", auth, controller.updateLoanCategory);

router.post("/delete-loan-category", auth, controller.deleteLoanCategory);

router.post(
  "/activate-loan-category",
  auth,
  controller.activateDeactiveLoanCategory
);

router.get("/loan-category/:id", controller.findByIdLoanCategory);

router.post("/loan-category-list", controller.ListLoanCategory);

export default router;
