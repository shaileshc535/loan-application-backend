import express from "express";
import controller from "../controller/user-address/userAddressController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createUserAddress);

router.put("/edit", auth, controller.editUserAddress);

router.put("/delete", auth, controller.deleteUserAddress);

router.put(
  "/change-activate-status",
  auth,
  controller.activateDeactiveUserAddress
);

router.get("/address/:id", auth, controller.GetUserAddressById);

router.post("/address", controller.GetUserAddressList);

export default router;
