import { Response } from "express";
import blogsModel from "../../modal/blogsModel";

const createBlog = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Blog.",
      });
    }

    if (!requestData.title) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog title is required.",
      });
    }

    const base_url = process.env.BASE_URL;

    const file_url = base_url + "/public/" + req.file.filename;

    const newBlog = new blogsModel({
      author: user._id,
      category: requestData.category,
      title: requestData.title,
      slug: requestData.slug,
      description: requestData.description,
      summary: requestData.summary,
      main_image: file_url,
    });

    await newBlog.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Created successfully",
      data: newBlog,
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

const updateBlog = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Blog details.",
      });
    }

    if (!requestData.blogId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog Id is required.",
      });
    }

    const blog = await blogsModel.findById({
      _id: requestData.blogId,
    });

    if (!blog) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog not found.",
      });
    }

    const base_url = process.env.BASE_URL;

    const file_url = base_url + "/public/" + req.file.filename;

    const data = {
      category: requestData.category,
      title: requestData.title,
      slug: requestData.slug,
      description: requestData.description,
      summary: requestData.summary,
      main_image: file_url,
    };

    await blogsModel.findByIdAndUpdate(
      {
        _id: requestData.blogId,
      },
      data
    );

    const result = await blogsModel.findById({
      _id: requestData.blogId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Updated Successfully",
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

const deleteBlog = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Blog.",
      });
    }

    if (!requestData.blogId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog Id is required.",
      });
    }

    const blog = await blogsModel.findById({
      _id: requestData.blogId,
    });

    if (!blog) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await blogsModel.findByIdAndUpdate(
      {
        _id: requestData.blogId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Deleted Successfully",
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

const activateDeactiveBlog = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Blog details.",
      });
    }

    if (!requestData.blogId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog Id is required.",
      });
    }

    const Data = await blogsModel.findById({
      _id: requestData.blogId,
    });

    if (!Data) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog not found.",
      });
    }

    const data = {
      isactive: !Data.isactive,
    };

    await blogsModel.findByIdAndUpdate(
      {
        _id: requestData.blogId,
      },
      data
    );

    const result = await blogsModel.findById({
      _id: requestData.blogId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Status Updated Successfully",
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

const findByBlogCategoryId = async (req, res: Response) => {
  try {
    const catId = req.params.catId;

    const result = await blogsModel
      .findById({
        category: catId,
        isdeleted: false,
        isactive: true,
      })
      .populate("category");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Fetch Successfully",
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

const findByIdBlog = async (req, res: Response) => {
  try {
    const blogId = req.params.id;

    const result = await blogsModel
      .findById({
        _id: blogId,
        isdeleted: false,
        isactive: true,
      })
      .populate("category");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Blog Fetch Successfully",
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

const ListBlog = async (req, res: Response) => {
  try {
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

    const result = await blogsModel
      .find(cond)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await blogsModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Blogs Fetch Successfully",
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
  createBlog,
  updateBlog,
  deleteBlog,
  activateDeactiveBlog,
  findByIdBlog,
  findByBlogCategoryId,
  ListBlog,
};
