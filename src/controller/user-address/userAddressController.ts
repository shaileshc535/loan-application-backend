import userAddressModel from "../../modal/userAddressModel";
import { Response } from "express";
// import mongoose from "mongoose";
// const ObjectId = <any>mongoose.Types.ObjectId;

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
      user_id: user._id,
    });

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
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
      user_id: user._id,
    });

    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
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
      status: 200,
      success: true,
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
      user_id: user._id,
    });

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Address not found.`,
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

    const id = req.params.id;

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

    const result = await userAddressModel
      .findById({
        _id: id,
        isdeleted: false,
        isactive: true,
      })
      .populate("user_id")
      .populate("city")
      .populate("state")
      .populate("country");

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
    const user = JSON.parse(JSON.stringify(req.user));

    let { page, limit, sort, cond } = req.body;

    if (user) {
      cond = {
        user_id: user._id,
        isdeleted: false,
        ...cond,
      };
    }

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

    const result = await userAddressModel
      .find(cond)
      .populate("user_id")
      .populate("city")
      .populate("state")
      .populate("country")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await userAddressModel.find(cond).count();

    const totalPages = Math.ceil(result_count / limit);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User Address Fetch Successfully",
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
  createUserAddress,
  editUserAddress,
  deleteUserAddress,
  activateDeactiveUserAddress,
  GetUserAddressById,
  GetUserAddressList,
};
