import { Response } from "express";
import countryModal from "../../modal/countryModal";
import stateModel from "../../modal/stateModel";
import cityModel from "../../modal/cityModel";

const CountryList = async (req, res: Response) => {
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

    const result = await countryModal.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Country List Fetch Successfully",
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

const StateList = async (req, res: Response) => {
  try {
    let { page, limit, sort, cond } = req.body;

    const country_id = Number(req.body.country_id);

    if (!country_id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Country Id is required.",
      });
    }

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
          country_id: country_id,
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

    const result = await stateModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "State List Fetch Successfully",
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

const CityList = async (req, res: Response) => {
  try {
    let { page, limit, sort, cond } = req.body;

    const state_id = Number(req.body.state_id);
    const country_id = Number(req.body.country_id);

    if (!country_id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Country Id is required.",
      });
    }

    if (!state_id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Country Id is required.",
      });
    }

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
          country_id: country_id,
          state_id: state_id,
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

    const result = await cityModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "City List Fetch Successfully",
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
  CountryList,
  StateList,
  CityList,
};
