import AppModal from "../../modal/Apps-Modal";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
// import mongoose from "mongoose";
// const ObjectId = <any>mongoose.Types.ObjectId;

const CreateApp = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    const newApp = new AppModal({
      name: requestData.name,
      slug: requestData.slug,
      privacy_policy: requestData.privacy_policy,
      permission: requestData.permission,
      roles: requestData.roles,
    });

    await newApp.save();

    res.status(200).json({
      type: "success",
      status: 200,
      message: "New App Created successfully",
      data: newApp,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      type: "error",
      message: error.message,
    });
  }
};

const EditApp = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const requestData = req.body;

    const data = {
      name: requestData.name,
      slug: requestData.slug,
      privacy_policy: requestData.privacy_policy,
      permission: requestData.permission,
      roles: requestData.roles,
    };

    await AppModal.findByIdAndUpdate(
      {
        _id: requestData.appId,
      },
      data
    );

    const result = await AppModal.findById({ _id: requestData.appId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "App Details Updated Successfully",
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

const DeleteApp = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.body.appId;

    if (user.role != "admin") {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "You are not authorise to delete Apps.",
      });
    }

    const newData = {
      isdeleted: true,
    };

    await AppModal.findByIdAndUpdate(
      {
        _id: id,
      },
      newData
    );

    res.status(200).json({
      status: true,
      type: "success",
      message: "App Deleted Successfully.",
      data: "",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: "error",
      status: false,
      message: error.message,
    });
  }
};

const GetAppById = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.params.appId;

    const result = await AppModal.findById({ _id: id, isdeleted: false });

    res.status(200).json({
      status: true,
      type: "success",
      message: "App Details Fetch Successfully",
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

const GetAppsList = async (req, res: Response) => {
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
                { name: { $regex: search, $options: "i" } },
                { slug: { $regex: search, $options: "i" } },
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

    const result = await AppModal.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: true,
      type: "success",
      message: "Apps List Fetch Successfully",
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
  CreateApp,
  EditApp,
  DeleteApp,
  GetAppById,
  GetAppsList,
};
