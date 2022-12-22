import express from "express";
import controller from "../controller/product-category/productCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createProductCategory);

router.put("/edit", auth, controller.updateProductCategory);

router.put("/delete", auth, controller.deleteProductCategory);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveProductCategory
);

router.get("/product-category/:id", controller.findByIdProductCategory);

router.post("/product-category", controller.ListProductCategory);

export default router;
