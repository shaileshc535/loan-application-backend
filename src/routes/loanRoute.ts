import express from "express";
import controller from "../controller/Loan/loanController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", auth, controller.createLoan);

router.put("/edit", auth, controller.updateLoan);

router.put("/delete", auth, controller.deleteLoan);

router.put("/change-activate-status", auth, controller.activateDeactiveLoan);

router.get("/loan/:id", controller.findByIdLoan);

router.post("/loan", controller.ListLoan);

export default router;
