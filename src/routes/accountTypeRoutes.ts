import express from "express";
import controller from "../controller/account-type/accountTypeController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createAccountType);

router.put("/edit", auth, controller.updateAccountType);

router.put("/delete", auth, controller.deleteAccountType);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveAccountType
);

router.get("/account-type/:id", controller.findByIdAccountType);

router.post("/account-type", controller.ListAccountType);

export default router;
