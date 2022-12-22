import { Response } from "express";
import UserAccountModel from "../../modal/userAccountModel";

const createUserAccount = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create User Account.",
      });
    }

    const newUserAccount = new UserAccountModel({
      user_id: requestData.user_id,
      user_address_id: requestData.user_address_id,
      account_type: requestData.account_type,
      branch_id: requestData.branch_id,
      account_no: requestData.account_no,
      balance: requestData.balance,
      transction_id: requestData.transction_id,
      transction_amount: requestData.transction_amount,
      transction_type: requestData.transction_type,
      transction_date: requestData.transction_date,
    });

    await newUserAccount.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Account Created successfully",
      data: newUserAccount,
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

const updateUserAccount = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update User Account details.",
      });
    }

    if (!requestData.userAccountId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account Id is required.",
      });
    }

    const UserAccount = await UserAccountModel.findById({
      _id: requestData.userAccountId,
    });

    if (!UserAccount) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account not found.",
      });
    }

    const data = {
      user_address_id: requestData.user_address_id,
      account_type: requestData.account_type,
      branch_id: requestData.branch_id,
      account_no: requestData.account_no,
      balance: requestData.balance,
      transction_id: requestData.transction_id,
      transction_amount: requestData.transction_amount,
      transction_type: requestData.transction_type,
      transction_date: requestData.transction_date,
    };

    await UserAccountModel.findByIdAndUpdate(
      {
        _id: requestData.userAccountId,
      },
      data
    );

    const result = await UserAccountModel.findById({
      _id: requestData.userAccountId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Account Updated Successfully",
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

const deleteUserAccount = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete User Account.",
      });
    }

    if (!requestData.userAccountId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account Id is required.",
      });
    }

    const UserAccount = await UserAccountModel.findById({
      _id: requestData.userAccountId,
    });

    if (!UserAccount) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await UserAccountModel.findByIdAndUpdate(
      {
        _id: requestData.userAccountId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Account Deleted Successfully",
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

const activateDeactiveUserAccount = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update User Account details.",
      });
    }

    if (!requestData.userAccountId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account Id is required.",
      });
    }

    const Data = await UserAccountModel.findById({
      _id: requestData.userAccountId,
    });

    if (!Data) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account not found.",
      });
    }

    const data = {
      isactive: !Data.isactive,
    };

    await UserAccountModel.findByIdAndUpdate(
      {
        _id: requestData.userAccountId,
      },
      data
    );

    const result = await UserAccountModel.findById({
      _id: requestData.userAccountId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Account Status Updated Successfully",
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

const findByIdUserAccount = async (req, res: Response) => {
  try {
    const userAccountId = req.params.id;

    const result = await UserAccountModel.findById({
      _id: userAccountId,
      isdeleted: false,
      isactive: true,
    })
      .populate("user_id")
      .populate("user_address_id")
      .populate("account_type")
      .populate("branch_id");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Account not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Account Fetch Successfully",
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

const AllUsersAccountList = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to read User Accounts List.",
      });
    }

    let { page, limit, sort, cond } = req.body;

    if (user) {
      cond = {
        isactive: true,
        isdeleted: false,
        ...cond,
      };
    }

    if (!page || page < 1) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    if (!cond) {
      cond = {};
    }
    if (!sort) {
      sort = { createdAt: -1 };
    }

    limit = parseInt(limit);

    const result = await UserAccountModel.find(cond)
      .populate("user_id")
      .populate("user_address_id")
      .populate("account_type")
      .populate("branch_id")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await UserAccountModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Account List Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result_count,
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

const UserAccountsList = async (req, res: Response) => {
  try {
    let { page, limit, sort, cond } = req.body;

    cond = {
      user_id: req.body.user_id,
      isactive: true,
      isdeleted: false,
      ...cond,
    };

    if (!page || page < 1) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    if (!cond) {
      cond = {};
    }
    if (!sort) {
      sort = { createdAt: -1 };
    }

    limit = parseInt(limit);

    const result = await UserAccountModel.find(cond)
      .populate("user_id")
      .populate("user_address_id")
      .populate("account_type")
      .populate("branch_id")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await UserAccountModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User Accounts Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result_count,
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

export default {
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
  activateDeactiveUserAccount,
  findByIdUserAccount,
  AllUsersAccountList,
  UserAccountsList,
};
