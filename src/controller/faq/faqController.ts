import { Response } from "express";
import FaqModel from "../../modal/faqModal";

const createFaq = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to create Faq.",
      });
    }

    if (!requestData.title) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq title is required.",
      });
    }

    if (!requestData.description) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq description is required.",
      });
    }

    const newFaq = new FaqModel({
      author: user._id,
      title: requestData.title,
      slug: requestData.slug,
      description: requestData.description,
    });

    await newFaq.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Faq Created successfully",
      data: newFaq,
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

const updateFaq = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Faq details.",
      });
    }

    if (!requestData.faqId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq Id is required.",
      });
    }

    const Faq = await FaqModel.findById({
      _id: requestData.faqId,
    });

    if (!Faq) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq not found.",
      });
    }

    const data = {
      title: requestData.title,
      slug: requestData.slug,
      description: requestData.description,
    };

    await FaqModel.findByIdAndUpdate(
      {
        _id: requestData.faqId,
      },
      data
    );

    const result = await FaqModel.findById({
      _id: requestData.faqId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Faq Updated Successfully",
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

const deleteFaq = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete Faq.",
      });
    }

    if (!requestData.faqId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq Id is required.",
      });
    }

    const Faq = await FaqModel.findById({
      _id: requestData.faqId,
    });

    if (!Faq) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq not found.",
      });
    }

    const data = {
      isdeleted: true,
    };

    await FaqModel.findByIdAndUpdate(
      {
        _id: requestData.faqId,
      },
      data
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Faq Deleted Successfully",
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

const activateDeactiveFaq = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update Faq details.",
      });
    }

    if (!requestData.faqId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq Id is required.",
      });
    }

    const Data = await FaqModel.findById({
      _id: requestData.faqId,
    });

    if (!Data) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq not found.",
      });
    }

    const data = {
      isactive: !Data.isactive,
    };

    await FaqModel.findByIdAndUpdate(
      {
        _id: requestData.faqId,
      },
      data
    );

    const result = await FaqModel.findById({
      _id: requestData.faqId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Faq Status Updated Successfully",
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

const findByIdFaq = async (req, res: Response) => {
  try {
    const faqId = req.params.id;

    const result = await FaqModel.findById({
      _id: faqId,
      isdeleted: false,
      isactive: true,
    }).populate("author");

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Faq not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Faq Fetch Successfully",
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

const ListFaq = async (req, res: Response) => {
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

    const result = await FaqModel.find(cond)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await FaqModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "FAQs Fetch Successfully",
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
  createFaq,
  updateFaq,
  deleteFaq,
  activateDeactiveFaq,
  findByIdFaq,
  ListFaq,
};
