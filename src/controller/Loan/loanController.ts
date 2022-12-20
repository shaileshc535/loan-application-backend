import { Response } from "express";
import loanModel from "../../modal/LoanModel";

const createLoan = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create loan.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan Category is required.",
      });
    }

    if (!requestData.subCategoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan Sub Category is required.",
      });
    }

    if (!requestData.userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Id is required.",
      });
    }

    const newLoan = new loanModel({
      loan_category_id: requestData.categoryId,
      loan_sub_category_id: requestData.subCategoryId,
      user_id: requestData.userId,
      name: requestData.name,
      slug: requestData.slug,
      type: requestData.type,
    });

    await newLoan.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "loan Created successfully",
      data: newLoan,
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

const updateLoan = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update loan details.",
      });
    }

    if (!requestData.loanId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan Id is required.",
      });
    }

    const categoryData = await loanModel.findById({
      _id: requestData.loanId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan details not found.",
      });
    }

    const data = {
      loan_category_id: requestData.categoryId,
      loan_sub_category_id: requestData.subCategoryId,
      user_id: requestData.userId,
      name: requestData.name,
      slug: requestData.slug,
      type: requestData.type,
    };

    await loanModel.findByIdAndUpdate(
      {
        _id: requestData.loanId,
      },
      data
    );

    const result = await loanModel.findById({
      _id: requestData.loanId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "loan Details Updated Successfully",
      data: result,
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

const deleteLoan = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update loan details.",
      });
    }

    if (!requestData.loanId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan Id is required.",
      });
    }

    const loanData = await loanModel.findById({
      _id: requestData.loanId,
    });

    if (!loanData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan details not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await loanModel.findByIdAndUpdate(
      {
        _id: requestData.loanId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "loan Deleted Successfully",
      data: "",
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

const activateDeactiveLoan = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update loan details.",
      });
    }

    if (!requestData.loanId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan Id is required.",
      });
    }

    const loanData = await loanModel.findById({
      _id: requestData.loanId,
    });

    if (!loanData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan details not found.",
      });
    }

    const data = {
      isactive: !loanData.isactive,
    };

    await loanModel.findByIdAndUpdate(
      {
        _id: requestData.loanId,
      },
      data
    );

    const result = await loanModel.findById({
      _id: requestData.loanId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "loan Deleted Successfully",
      data: result,
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

const findByIdLoan = async (req, res: Response) => {
  try {
    const loanId = req.params.id;

    const result = await loanModel
      .findById({
        _id: loanId,
        isdeleted: false,
        isactive: true,
      })
      .populate("loan_category_id")
      .populate("loan_sub_category_id")
      .populate("user_id");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Loan details not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan details fetch successfully",
      data: result,
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

const ListLoan = async (req, res: Response) => {
  try {
    let { page, limit, sort, cond } = req.body;

    let search = "";

    if (!page || page < 1) {
      page = 1;
    }
    if (!limit) {
      limit = 9;
    }
    if (!cond) {
      cond = {};
    }

    if (!sort) {
      sort = { createdAt: -1 };
    }
    if (typeof cond.search != "undefined" && cond.search != null) {
      search = String(cond.search);
      delete cond.search;
    }

    cond = [
      {
        $match: {
          isdeleted: false,
          isactive: true,
          $and: [
            cond,
            {
              $or: [{ name: { $regex: search, $options: "i" } }],
            },
          ],
        },
      },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ];
    limit = parseInt(limit);

    const result = await loanModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "loan List Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result[0].total.length != 0 ? result[0].total[0].count : 0,
      data: result[0].data,
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

const LoanCalculator = async (req, res: Response) => {
  try {
    const requestedData = req.body;

    const loanAmount = Number(requestedData.loanAmount);

    const loanInsterRate = Number(requestedData.loanInsterRate);

    const loan_tenure = Number(requestedData.loan_tenure);

    const tenure = loan_tenure * 12;

    if (loanAmount !== null && loanInsterRate !== 0) {
      const RateOfIntrest = loanInsterRate / 12 / 100;

      const EMI = Number(
        loanAmount *
          RateOfIntrest *
          (Math.pow(1 + RateOfIntrest, tenure) /
            (Math.pow(1 + RateOfIntrest, tenure) - 1))
      );

      const total_amount = EMI * tenure;

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Loan Amount Calculate successfully",
        data: [EMI, total_amount],
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan details fetch successfully",
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

export default {
  createLoan,
  updateLoan,
  deleteLoan,
  activateDeactiveLoan,
  findByIdLoan,
  ListLoan,
  LoanCalculator,
};
