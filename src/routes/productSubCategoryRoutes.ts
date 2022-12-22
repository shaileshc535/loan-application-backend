import express from "express";
import controller from "../controller/product-subcategory/productSubCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createProductSubCategory);

router.put("/edit", auth, controller.updateProductSubCategory);

router.put("/delete", auth, controller.deleteProductSubCategory);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveProductSubCategory
);

router.get("/product-subcategory/:id", controller.findByIdProductSubCategory);

router.post("/product-subcategory", controller.ListProductSubCategory);

export default router;
