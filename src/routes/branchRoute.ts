import express from "express";
import controller from "../controller/branch/branchController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createBranch);

router.put("/edit", auth, controller.updateBranch);

router.put("/delete", auth, controller.deleteBranch);

router.put("/change-activate-status", auth, controller.activateDeactiveBranch);

router.get("/branch/:id", controller.findByIdBranch);

router.post("/branch", controller.ListBranch);

export default router;
