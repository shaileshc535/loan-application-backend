import { Response } from "express";
// import loanModel from "../../modal/LoanModel";

const LoanCalculator = async (req, res: Response) => {
  try {
    const requestedData = req.body;

    const loanAmount = Number(requestedData.loanAmount);

    const loanInsterRate = Number(requestedData.loanInsterRate);

    const loanTenure = Number(requestedData.loanTenure);

    const loanTenureType = requestedData.loan_tenure_type;

    let tenure = 0;

    if (loanTenureType === "monthly") {
      tenure = loanTenure;
    } else if (loanTenureType === "yearly") {
      tenure = loanTenure * 12;
    }

    if (loanAmount !== null && loanInsterRate !== 0) {
      const RateOfIntrest = loanInsterRate / 12 / 100;

      const EMI = Number(
        loanAmount *
          RateOfIntrest *
          (Math.pow(1 + RateOfIntrest, tenure) /
            (Math.pow(1 + RateOfIntrest, tenure) - 1))
      );

      const total_amount = EMI * tenure;

      const intrest_amount = total_amount - loanAmount;

      const data = {
        loanAmount: loanAmount,
        loanInsterRate: loanInsterRate,
        tenure: tenure,
        loanTenureType: loanTenureType,
        EMI: EMI,
        total_amount: total_amount,
        intrest_amount: intrest_amount,
      };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Loan Amount Calculate successfully",
        data: data,
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan details calculated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      errors: error,
      msg: "Something went wrong. Please try again",
    });
  }
};

export default { LoanCalculator };
