import express from "express";
import controller from "../controller/loan subcategory/loanSubCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create-loan-subcategory", auth, controller.createLoanSubCategory);

router.post("/edit-loan-subcategory", auth, controller.updateLoanSubCategory);

router.post("/delete-loan-subcategory", auth, controller.deleteLoanSubCategory);

router.post(
  "/activate-loan-subcategory",
  auth,
  controller.activateDeactiveLoanSubCategory
);

router.get("/loan-subcategory/:id", controller.findByIdLoanSubCategory);

router.post("/loan-subcategory-list", controller.ListLoanSubCategory);

export default router;
