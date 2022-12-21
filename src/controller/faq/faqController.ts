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
    });

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
              $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
              ],
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

    const result = await FaqModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Faq List Fetch Successfully",
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
  createFaq,
  updateFaq,
  deleteFaq,
  activateDeactiveFaq,
  findByIdFaq,
  ListFaq,
};
