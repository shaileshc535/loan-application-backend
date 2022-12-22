import { Response } from "express";
import BranchModel from "../../modal/branchModel";

const createBranch = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    const uniqueId = Math.random().toString(36).substr(2, 9);

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Branch.",
      });
    }

    if (!requestData.branch_name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch name is required.",
      });
    }

    const newBranch = new BranchModel({
      branch_name: requestData.branch_name,
      branch_code: uniqueId,
      address: requestData.address,
      landmark: requestData.landmark,
      city: requestData.city,
      state: requestData.state,
      country: requestData.country,
      pincode: requestData.pincode,
      phone: requestData.phone,
      fax: requestData.fax,
    });

    await newBranch.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Branch Created successfully",
      data: newBranch,
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

const updateBranch = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Branch details.",
      });
    }

    if (!requestData.branchId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch Id is required.",
      });
    }

    const Branch = await BranchModel.findById({
      _id: requestData.branchId,
    });

    if (!Branch) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch not found.",
      });
    }

    const data = {
      branch_name: requestData.branch_name,
      branch_code: requestData.branch_code,
      address: requestData.address,
      landmark: requestData.landmark,
      city: requestData.city,
      state: requestData.state,
      country: requestData.country,
      pincode: requestData.pincode,
      phone: requestData.phone,
      fax: requestData.fax,
    };

    await BranchModel.findByIdAndUpdate(
      {
        _id: requestData.branchId,
      },
      data
    );

    const result = await BranchModel.findById({
      _id: requestData.branchId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Branch Updated Successfully",
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

const deleteBranch = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Branch.",
      });
    }

    if (!requestData.branchId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch Id is required.",
      });
    }

    const Branch = await BranchModel.findById({
      _id: requestData.branchId,
    });

    if (!Branch) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await BranchModel.findByIdAndUpdate(
      {
        _id: requestData.branchId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Branch Deleted Successfully",
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

const activateDeactiveBranch = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Branch details.",
      });
    }

    if (!requestData.branchId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch Id is required.",
      });
    }

    const Data = await BranchModel.findById({
      _id: requestData.branchId,
    });

    if (!Data) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch not found.",
      });
    }

    const data = {
      isactive: !Data.isactive,
    };

    await BranchModel.findByIdAndUpdate(
      {
        _id: requestData.branchId,
      },
      data
    );

    const result = await BranchModel.findById({
      _id: requestData.branchId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Branch Status Updated Successfully",
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

const findByIdBranch = async (req, res: Response) => {
  try {
    const branchId = req.params.id;

    const result = await BranchModel.findById({
      _id: branchId,
      isdeleted: false,
      isactive: true,
    })
      .populate("city")
      .populate("state")
      .populate("country");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Branch not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Branch Fetch Successfully",
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

const ListBranch = async (req, res: Response) => {
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

    const result = await BranchModel.find(cond)
      .populate("city")
      .populate("state")
      .populate("country")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await BranchModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Branches List Fetch Successfully",
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
  createBranch,
  updateBranch,
  deleteBranch,
  activateDeactiveBranch,
  findByIdBranch,
  ListBranch,
};
