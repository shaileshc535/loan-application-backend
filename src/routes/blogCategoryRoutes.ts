import express from "express";
import controller from "../controller/blog-category/blogCategoryController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createBlogCategory);

router.put("/edit", auth, controller.updateBlogCategory);

router.put("/delete", auth, controller.deleteBlogCategory);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveBlogCategory
);

router.get("/blog-category/:id", controller.findByIdBlogCategory);

router.post("/blog-category", controller.ListBlogCategory);

export default router;
