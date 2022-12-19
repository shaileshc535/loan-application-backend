import SEOModal from "../../modal/Seo-Modal";
import { Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
const ObjectId = <any>mongoose.Types.ObjectId;

const createSEOTag = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const base_url = process.env.BASE_URL;

    const seo_icon_url = base_url + "/public/" + req.files.seo_icon[0].filename;
    const web_icon_url = base_url + "/public/" + req.files.web_icon[0].filename;

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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: "error",
      status: false,
      message: error.message,
    });
  }
};

const editSeoTag = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    const requestData = req.body;

    const result = await SEOModal.findByIdAndUpdate(
      {
        _id: requestData.seoId,
      },
      requestData
    );

    res.status(200).json({
      status: true,
      type: "success",
      message: "SEO Tag Details Updated Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: "error",
      status: false,
      message: error.message,
    });
  }
};

const deleteSeoTag = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.body.seoId;

    if (user.role_id != "admin") {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "You are not authorise to delete SEO tags.",
      });
    }

    const newData = {
      isdeleted: true,
    };

    const result = await SEOModal.findByIdAndUpdate(
      {
        _id: id,
      },
      newData
    );

    res.status(200).json({
      status: true,
      type: "success",
      message: "SEO Tag Deleted Successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: "error",
      status: false,
      message: error.message,
    });
  }
};

const GetSeoTagById = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    const id = req.params.seoId;

    const result = await SEOModal.findById({ _id: id });

    res.status(200).json({
      status: true,
      type: "success",
      message: "SEO Tag Details Fetch Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      type: "error",
      message: error.message,
    });
  }
};

const GetSeoTagList = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
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
      status: true,
      type: "success",
      message: "SEO Tag's Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result[0].total.length != 0 ? result[0].total[0].count : 0,
      data: result[0].data,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export default {
  createSEOTag,
  editSeoTag,
  deleteSeoTag,
  GetSeoTagById,
  GetSeoTagList,
};
