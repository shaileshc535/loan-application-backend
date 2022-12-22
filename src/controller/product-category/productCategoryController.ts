import { Response } from "express";
import ProductCategoryModel from "../../modal/productCategoryModel";

const createProductCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Product category.",
      });
    }

    if (!requestData.name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category name is required.",
      });
    }

    const newProductCategory = new ProductCategoryModel({
      name: requestData.name,
      slug: requestData.slug,
      description: requestData.description,
    });

    await newProductCategory.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Category Created successfully",
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

const updateProductCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Product category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is requireds.",
      });
    }

    const categoryData = await ProductCategoryModel.findById({
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
      description: requestData.description,
    };

    await ProductCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await ProductCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Category Updated Successfully",
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

const deleteProductCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Product category.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is required.",
      });
    }

    const categoryData = await ProductCategoryModel.findById({
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

    await ProductCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Category Deleted Successfully",
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

const activateDeactiveProductCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Product category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Category Id is required.",
      });
    }

    const categoryData = await ProductCategoryModel.findById({
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

    await ProductCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await ProductCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Category Status Updated Successfully",
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

const findByIdProductCategory = async (req, res: Response) => {
  try {
    const categoryId = req.params.id;

    const result = await ProductCategoryModel.findById({
      _id: categoryId,
      isdeleted: false,
      isactive: true,
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
      message: "Product Category Fetch Successfully",
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

const ListProductCategory = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    let { page, limit, sort, cond } = req.body;

    cond = {
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

    const result = await ProductCategoryModel.find(cond)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await ProductCategoryModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product Category Fetch Successfully",
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
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  activateDeactiveProductCategory,
  findByIdProductCategory,
  ListProductCategory,
};
