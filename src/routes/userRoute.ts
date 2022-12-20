import express from "express";
import Login from "../controller/user/login.controller";
import Register from "../controller/user/register.controller";
import Passwordcontroller from "../controller/user/Password.controller";
import PermissionController from "../controller/user/permission.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/register", Register);

router.post("/login", Login);

router.post("/forgotPass", Passwordcontroller.forgotPassword);

router.post("/password-reset/:userId/:token", Passwordcontroller.resetPassword);

router.post("/forgot-reset-password", Passwordcontroller.changeTempPassword);

router.post("/password-change", auth, Passwordcontroller.changePassword);

router.post("/list-users", auth, Passwordcontroller.ListAllUsers);

router.post("/activate-users", auth, PermissionController.ActivateUser);

router.post("/user-role-update", auth, PermissionController.userRollUpdate);

router.post("/user-app-update", auth, PermissionController.userAppsUpdate);

router.post("/user-email-verify", auth, PermissionController.UserEmailVerify);

router.post("/user-phone-verify", auth, PermissionController.UserPhoneVerify);

router.post(
  "/user-permission-update",
  auth,
  PermissionController.userPermissionsUpdate
);

router.post("/send-phone-otp", PermissionController.SendPhoneOTP);

export default router;
