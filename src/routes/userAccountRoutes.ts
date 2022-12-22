import express from "express";
import controller from "../controller/user-account/userAccountController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createUserAccount);

router.put("/edit", auth, controller.updateUserAccount);

router.put("/delete", auth, controller.deleteUserAccount);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveUserAccount
);

router.get("/user-account/:id", auth, controller.findByIdUserAccount);

router.post("/all-users-account", auth, controller.AllUsersAccountList);

router.post("/user-account", auth, controller.UserAccountsList);

export default router;
