import express from "express";
import controller from "../controller/product/productController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createProduct);

router.put("/edit", auth, controller.updateProduct);

router.put("/delete", auth, controller.deleteProduct);

router.put("/change-activate-status", auth, controller.activateDeactiveProduct);

router.get("/product/:id", controller.findByIdProduct);

router.post("/product", controller.ListProduct);

export default router;
