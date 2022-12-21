import { Response } from "express";
import blogCategoryModel from "../../modal/blogCategoryModel";

const createBlogCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Blog category.",
      });
    }

    if (!requestData.name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category name is required.",
      });
    }

    const newBlogCategory = new blogCategoryModel({
      name: requestData.name,
      slug: requestData.slug,
      description: requestData.description,
    });

    await newBlogCategory.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category Created successfully",
      data: newBlogCategory,
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

const updateBlogCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Blog-category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category Id is requireds.",
      });
    }

    const categoryData = await blogCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category not found.",
      });
    }

    const data = {
      name: requestData.name,
      slug: requestData.slug,
      description: requestData.description,
    };

    await blogCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await blogCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category Updated Successfully",
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

const deleteBlogCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Blog-category.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category Id is required.",
      });
    }

    const categoryData = await blogCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await blogCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category Deleted Successfully",
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

const activateDeactiveBlogCategory = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Blog-category details.",
      });
    }

    if (!requestData.categoryId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category Id is required.",
      });
    }

    const categoryData = await blogCategoryModel.findById({
      _id: requestData.categoryId,
    });

    if (!categoryData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category not found.",
      });
    }

    const data = {
      isactive: !categoryData.isactive,
    };

    await blogCategoryModel.findByIdAndUpdate(
      {
        _id: requestData.categoryId,
      },
      data
    );

    const result = await blogCategoryModel.findById({
      _id: requestData.categoryId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category Status Updated Successfully",
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

const findByIdBlogCategory = async (req, res: Response) => {
  try {
    const categoryId = req.params.id;

    const result = await blogCategoryModel.findById({
      _id: categoryId,
      isdeleted: false,
      isactive: true,
    });

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog-Category not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category Fetch Successfully",
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

const ListBlogCategory = async (req, res: Response) => {
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

    const result = await blogCategoryModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Blog-Category List Fetch Successfully",
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
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  activateDeactiveBlogCategory,
  findByIdBlogCategory,
  ListBlogCategory,
};
