import userAddressModel from "../../modal/userAddressModel";
import { Response } from "express";

const createUserAddress = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (!user) {
      return res.status(404).json({
        status: 400,
        success: false,
        message: "User details are Required.",
      });
    }

    const requestedData = req.body;

    if (!requestedData.address) {
      return res.status(404).json({
        status: 400,
        success: false,
        message: "Address is Required.",
      });
    }

    if (!requestedData.city) {
      return res.status(404).json({
        status: 400,
        success: false,
        message: "City is Required.",
      });
    }

    const newUserAddress = new userAddressModel({
      user_id: user._id,
      contact_person: requestedData.contact_person,
      phonecode: requestedData.phonecode,
      house_no: requestedData.house_no,
      street: requestedData.street,
      address: requestedData.address,
      landmark: requestedData.landmark,
      city: requestedData.city,
      state: requestedData.state,
      country: requestedData.country,
      pincode: requestedData.pincode,
      type: requestedData.type,
    });

    await newUserAddress.save();

    res.status(200).json({
      type: "success",
      status: 200,
      message: "User Address Saved successfully",
      data: newUserAddress,
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

const editUserAddress = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (!user) {
      return res.status(404).json({
        status: 400,
        success: false,
        message: "User details are Required.",
      });
    }

    const requestedData = req.body;

    if (!requestedData.addressId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Address Id is required.`,
      });
    }

    const address = await userAddressModel.findById({
      _id: requestedData.addressId,
    });

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
      });
    }

    if (address._id !== user._id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `You are not authorise to update User Address.`,
      });
    }

    const data = {
      contact_person: requestedData.contact_person,
      phonecode: requestedData.phonecode,
      house_no: requestedData.house_no,
      street: requestedData.street,
      address: requestedData.address,
      landmark: requestedData.landmark,
      city: requestedData.city,
      state: requestedData.state,
      country: requestedData.country,
      pincode: requestedData.pincode,
      type: requestedData.type,
    };

    await userAddressModel.findByIdAndUpdate(
      {
        _id: requestedData.addressId,
      },
      data
    );

    const result = await userAddressModel.findById({
      _id: requestedData.addressId,
    });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Address Updated Successfully",
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

const deleteUserAddress = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.body.addressId;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Address id is required.`,
      });
    }

    const result = await userAddressModel.findById({
      _id: id,
    });

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
      });
    }
    if (result._id !== user._id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `You are not authorise to delete User Address.`,
      });
    }

    const newData = {
      isdeleted: true,
    };

    await userAddressModel.findByIdAndUpdate(
      {
        _id: id,
      },
      newData
    );

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Address Deleted Successfully.",
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

const activateDeactiveUserAddress = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.body.addressId;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Address id is required.`,
      });
    }

    const address = await userAddressModel.findById({
      _id: id,
    });

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
      });
    }
    if (address._id !== user._id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `You are not authorise to update User Address.`,
      });
    }

    const data = {
      isactive: !address.isactive,
    };

    await userAddressModel.findByIdAndUpdate(
      {
        _id: id,
      },
      data
    );

    const result = await userAddressModel.findById({
      _id: id,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Address activation Status changed Successfully",
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

const GetUserAddressById = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    const id = req.params.addressId;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Seo Id is required.`,
      });
    }

    const address = await userAddressModel.findById({
      _id: id,
      user_id: user._id,
    });

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Address not forund.`,
      });
    }

    const result = await userAddressModel.findById({
      _id: id,
      isdeleted: false,
      isactive: true,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Address Details Fetch Successfully",
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

const GetUserAddressList = async (req, res: Response) => {
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
                { address: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
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

    const result = await userAddressModel.aggregate(cond);

    let totalPages = 0;
    if (result[0].total.length != 0) {
      totalPages = Math.ceil(result[0].total[0].count / limit);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User Address Fetch Successfully",
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
  createUserAddress,
  editUserAddress,
  deleteUserAddress,
  activateDeactiveUserAddress,
  GetUserAddressById,
  GetUserAddressList,
};
