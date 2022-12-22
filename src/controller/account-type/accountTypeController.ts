import { Response } from "express";
import AccountTypeModel from "../../modal/accountTypeModel";

const createAccountType = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Account-Type.",
      });
    }

    if (!requestData.name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type name is required.",
      });
    }

    const newAccountType = new AccountTypeModel({
      name: requestData.name,
      description: requestData.description,
    });

    await newAccountType.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Account-Type Created successfully",
      data: newAccountType,
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

const updateAccountType = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Account-Type details.",
      });
    }

    if (!requestData.accountTypeId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type Id is required.",
      });
    }

    const AccountType = await AccountTypeModel.findById({
      _id: requestData.accountTypeId,
    });

    if (!AccountType) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type not found.",
      });
    }

    const data = {
      name: requestData.name,
      description: requestData.description,
    };

    await AccountTypeModel.findByIdAndUpdate(
      {
        _id: requestData.accountTypeId,
      },
      data
    );

    const result = await AccountTypeModel.findById({
      _id: requestData.accountTypeId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Account-Type Updated Successfully",
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

const deleteAccountType = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Account-Type.",
      });
    }

    if (!requestData.accountTypeId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type Id is required.",
      });
    }

    const AccountType = await AccountTypeModel.findById({
      _id: requestData.accountTypeId,
    });

    if (!AccountType) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await AccountTypeModel.findByIdAndUpdate(
      {
        _id: requestData.accountTypeId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Account-Type Deleted Successfully",
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

const activateDeactiveAccountType = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Account-Type details.",
      });
    }

    if (!requestData.accountTypeId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type Id is required.",
      });
    }

    const Data = await AccountTypeModel.findById({
      _id: requestData.accountTypeId,
    });

    if (!Data) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type not found.",
      });
    }

    const data = {
      isactive: !Data.isactive,
    };

    await AccountTypeModel.findByIdAndUpdate(
      {
        _id: requestData.accountTypeId,
      },
      data
    );

    const result = await AccountTypeModel.findById({
      _id: requestData.accountTypeId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Account-Type Status Updated Successfully",
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

const findByIdAccountType = async (req, res: Response) => {
  try {
    const accountTypeId = req.params.id;

    const result = await AccountTypeModel.findById({
      _id: accountTypeId,
      isdeleted: false,
      isactive: true,
    });

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account-Type not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Account-Type Fetch Successfully",
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

const ListAccountType = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    let { page, limit, sort, cond } = req.body;

    // if (user) {
    cond = {
      isactive: true,
      isdeleted: false,
      ...cond,
    };
    // }

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

    const result = await AccountTypeModel.find(cond)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await AccountTypeModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Account Type List Fetch Successfully",
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
  createAccountType,
  updateAccountType,
  deleteAccountType,
  activateDeactiveAccountType,
  findByIdAccountType,
  ListAccountType,
};
