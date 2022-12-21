import express from "express";
import controller from "../controller/seo/seoController";
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

const upload = multer({ storage: storage });

const seoTagMulterUpload = upload.fields([
  { name: "seo_icon", maxCount: 1 },
  { name: "web_icon", maxCount: 1 },
]);

const router = express.Router();

router.post("/create", auth, seoTagMulterUpload, controller.createSEOTag);

router.put("/edit", auth, seoTagMulterUpload, controller.editSeoTag);

router.put("/delete", auth, controller.deleteSeoTag);

router.put("/change-activate-status", auth, controller.activateDeactiveLoan);

router.get("/seo-tag/:seoId", auth, controller.GetSeoTagById);

router.post("/seo-tag", auth, controller.GetSeoTagList);

export default router;
