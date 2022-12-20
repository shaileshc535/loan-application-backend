import express from "express";
import controller from "../controller/Loan/loanController";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create-loan", auth, controller.createLoan);

router.post("/edit-loan", auth, controller.updateLoan);

router.post("/delete-loan", auth, controller.deleteLoan);

router.post("/activate-loan", auth, controller.activateDeactiveLoan);

router.get("/loan/:id", controller.findByIdLoan);

router.post("/loan-list", controller.ListLoan);

router.post("/calculate", controller.LoanCalculator);

export default router;
