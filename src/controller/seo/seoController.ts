import SEOModal from "../../modal/Seo-Modal";
import { Response } from "express";

const createSEOTag = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    const seo_icon_url =
      process.env.BASE_URL + "/public/" + req.files.seo_icon[0].filename;
    const web_icon_url =
      process.env.BASE_URL + "/public/" + req.files.web_icon[0].filename;

    const newSeoTag = new SEOModal({
      page_name: req.body.page_name,
      page_url: req.body.page_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      heading_tags: req.body.heading_tags,
      seo_icon: seo_icon_url,
      web_icon: web_icon_url,
    });

    await newSeoTag.save();

    res.status(200).json({
      type: "success",
      status: 200,
      message: "SEO Tag Created successfully",
      data: newSeoTag,
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

const editSeoTag = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (!requestData.seoId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Seo Id is required.`,
      });
    }

    const seo_icon_url =
      process.env.BASE_URL + "/public/" + req.files.seo_icon[0].filename;
    const web_icon_url =
      process.env.BASE_URL + "/public/" + req.files.web_icon[0].filename;

    const data = {
      page_name: req.body.page_name,
      page_url: req.body.page_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      heading_tags: req.body.heading_tags,
      seo_icon: seo_icon_url,
      web_icon: web_icon_url,
    };

    await SEOModal.findByIdAndUpdate(
      {
        _id: requestData.seoId,
      },
      data
    );

    const result = await SEOModal.findById({ _id: requestData.seoId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "SEO Tag Details Updated Successfully",
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

const deleteSeoTag = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.body.seoId;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Seo Id is required.`,
      });
    }

    if (user.role != "admin") {
      return res.status(404).json({
        status: 400,
        success: false,
        message: "You are not authorise to delete SEO tags.",
      });
    }

    const newData = {
      isdeleted: true,
    };

    await SEOModal.findByIdAndUpdate(
      {
        _id: id,
      },
      newData
    );

    res.status(200).json({
      status: true,
      type: "success",
      message: "SEO Tag Deleted Successfully.",
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

const activateDeactiveLoan = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    if (user.role != "admin") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You are not authorise to update seo details.",
      });
    }

    if (!requestData.seoId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "SEO Id is required.",
      });
    }

    const seoData = await SEOModal.findById({
      _id: requestData.seoId,
    });

    if (!seoData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "SEO details not found.",
      });
    }

    const data = {
      isactive: !seoData.isactive,
    };

    await SEOModal.findByIdAndUpdate(
      {
        _id: requestData.seoId,
      },
      data
    );

    const result = await SEOModal.findById({
      _id: requestData.seoId,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "SEO activation changed Successfully",
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

const GetSeoTagById = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

    const id = req.params.seoId;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Seo Id is required.`,
      });
    }

    const result = await SEOModal.findById({ _id: id, isdeleted: false });

    res.status(200).json({
      status: 200,
      success: true,
      message: "SEO Tag Details Fetch Successfully",
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

const GetSeoTagList = async (req, res: Response) => {
  try {
    // const user = JSON.parse(JSON.stringify(req.user));

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
              $or: [
                { page_name: { $regex: search, $options: "i" } },
                { meta_title: { $regex: search, $options: "i" } },
                { meta_description: { $regex: search, $options: "i" } },
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

    const result = await SEOModal.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "SEO Tag's Fetch Successfully",
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
  createSEOTag,
  editSeoTag,
  deleteSeoTag,
  GetSeoTagById,
  GetSeoTagList,
  activateDeactiveLoan,
};
