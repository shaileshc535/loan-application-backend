import { Response } from "express";
import loanCategoryModel from "../../modal/loanCategoryModel";

const createLoanCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create loan category.",
      });
    }

    if (!requestData.name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category name is required.",
      });
    }

    const newLoanCategory = new loanCategoryModel({
      name: requestData.name,
      slug: requestData.slug,
      type: requestData.type,
    });

    await newLoanCategory.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category Created successfully",
      data: newLoanCategory,
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

const updateLoanCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update loan category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is requireds.",
      });
    }

    const categoryData = await loanCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category not found.",
      });
    }

    const data = {
      name: requestData.name,
      slug: requestData.slug,
      type: requestData.type,
    };

    await loanCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await loanCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category Updated Successfully",
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

const deleteLoanCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete loan category.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is required.",
      });
    }

    const categoryData = await loanCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await loanCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category Deleted Successfully",
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

const activateDeactiveLoanCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update loan category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is required.",
      });
    }

    const categoryData = await loanCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category not found.",
      });
    }

    const data = {
      isactive: !categoryData.isactive,
    };

    await loanCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await loanCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category Status Updated Successfully",
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

const findByIdLoanCategory = async (req, res: Response) => {
  try {
    const categoryId = req.params.id;

    const result = await loanCategoryModel.findById({
      _id: categoryId,
      isdeleted: false,
    });

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category Fetch Successfully",
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

const ListLoanCategory = async (req, res: Response) => {
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

    const result = await loanCategoryModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category List Fetch Successfully",
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

const ListLoanCategoryAdmin = async (req, res: Response) => {
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

    const result = await loanCategoryModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Loan Category List Fetch Successfully",
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

export default {
  createLoanCategory,
  updateLoanCategory,
  deleteLoanCategory,
  activateDeactiveLoanCategory,
  findByIdLoanCategory,
  ListLoanCategory,
  ListLoanCategoryAdmin,
};
