import express from "express";
import controller from "../controller/loan subcategory/loanSubCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createLoanSubCategory);

router.put("/edit", auth, controller.updateLoanSubCategory);

router.put("/delete", auth, controller.deleteLoanSubCategory);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveLoanSubCategory
);

router.get("/loan-subcategory/:id", controller.findByIdLoanSubCategory);

router.post("/loan-subcategory", controller.ListLoanSubCategory);

router.post("/admin/loan-subcategory", controller.ListLoanSubCategoryAdmin);

export default router;
