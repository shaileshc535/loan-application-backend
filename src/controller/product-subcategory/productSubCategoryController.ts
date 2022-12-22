import { Response } from "express";
import ProductSubCategoryModel from "../../modal/productSubCategoryModel";

const createProductSubCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Product sub-category.",
      });
    }

    if (!requestData.name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category name is required.",
      });
    }

    if (!requestData.product_category_id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is required.",
      });
    }

    const newProductCategory = new ProductSubCategoryModel({
      product_category_id: requestData.product_category_id,
      name: requestData.name,
      slug: requestData.slug,
      description: requestData.description,
    });

    await newProductCategory.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Created successfully",
      data: newProductCategory,
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

const updateProductSubCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message:
          "You are not authorise to update Product sub-category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category Id is requireds.",
      });
    }

    const categoryData = await ProductSubCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category not found.",
      });
    }

    const data = {
      product_category_id: requestData.product_category_id,
      name: requestData.name,
      slug: requestData.slug,
      description: requestData.description,
    };

    await ProductSubCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await ProductSubCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Updated Successfully",
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

const deleteProductSubCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Product sub-category.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category Id is required.",
      });
    }

    const categoryData = await ProductSubCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await ProductSubCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Deleted Successfully",
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

const activateDeactiveProductSubCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message:
          "You are not authorise to update Product sub-category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category Id is required.",
      });
    }

    const categoryData = await ProductSubCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category not found.",
      });
    }

    const data = {
      isactive: !categoryData.isactive,
    };

    await ProductSubCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await ProductSubCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Status Updated Successfully",
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

const findByIdProductSubCategory = async (req, res: Response) => {
  try {
    const categoryId = req.params.id;

    const result = await ProductSubCategoryModel.findById({
      _id: categoryId,
      isdeleted: false,
      isactive: true,
    }).populate("product_category_id");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub-Category not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Fetch Successfully",
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

const ListProductSubCategory = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    let { page, limit, sort, cond } = req.body;

    // if (user) {
    cond = {
      // user_id: user._id,
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

    const result = await ProductSubCategoryModel.find(cond)
      .populate("product_category_id")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await ProductSubCategoryModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product Sub-Category Fetch Successfully",
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
  createProductSubCategory,
  updateProductSubCategory,
  deleteProductSubCategory,
  activateDeactiveProductSubCategory,
  findByIdProductSubCategory,
  ListProductSubCategory,
};
