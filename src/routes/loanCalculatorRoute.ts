import express from "express";
import controller from "../controller/loan-calculator/loanCalculatorController";
// import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/calculate", controller.LoanCalculator);

export default router;
