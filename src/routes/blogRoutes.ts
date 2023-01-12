import express from "express";
import controller from "../controller/blogs/blogController";
import auth from "../middlewares/auth.middleware";
import multer from "multer";
import { ensureDir } from "fs-extra";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await ensureDir("./public/");
    cb(null, "./public/");
  },

  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const datetimestamp = Date.now();

    cb(null, file.fieldname + "-" + datetimestamp + "." + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    callback(null, true);
  },
}).single("main_image");

const router = express.Router();

router.post("/create", auth, upload, controller.createBlog);

router.put("/edit", auth, upload, controller.updateBlog);

router.put("/delete", auth, controller.deleteBlog);

router.put("/change-activate-status", auth, controller.activateDeactiveBlog);

router.get("/blog/:id", controller.findByIdBlog);

router.get("/blog-by-category/:catId", controller.findByBlogCategoryId);

router.post("/blogs", controller.ListBlog);

export default router;
