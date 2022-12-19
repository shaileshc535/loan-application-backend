/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import User from "../../modal/user";
import Token from "../../modal/Password-reset-token";
import sendEmail from "../../services/sendEmail";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Joi from "joi";
import logger from "../../logger";

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);

    if (error) {
      logger.error({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      logger.error({
        type: "error",
        status: 400,
        message: "user with given email doesn't exist",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "user with given email doesn't exist",
      });
    }

    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    // const link = `${process.env.BASE_URL}/user/password-reset/${user._id}/${token.token}`;
    function generatePassword() {
      let length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal + "@";
    }

    const tempPass = generatePassword();

    user.password = tempPass;
    await user.save({ validateBeforeSave: false });
    // await token.delete();
    await sendEmail(
      user.email,
      "Here is your temprory created Password",
      tempPass
    );

    logger.info({
      type: "success",
      status: 200,
      message: "Temp Password",
      Password_Reset_Link: tempPass,
    });
    res.status(200).json({
      type: "success",
      status: 200,
      message: "Temp Password",
      Password_Reset_Link: tempPass,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(404).json({
      type: "error",
      status: 404,
      message: "An Error Occured Please Try After Some Time!",
    });
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const pass_rgex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  try {
    const { password, confirmPassword } = req.body;

    const schema = Joi.object({
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      logger.error({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      logger.error({
        type: "error",
        status: 400,
        message: "Invalid Link or expired",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "Invalid Link or expired",
      });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      logger.error({
        type: "error",
        status: 400,
        message: "Invalid Link or expired",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "Invalid Link or expired",
      });
    }

    if (!pass_rgex.test(password)) {
      logger.error({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    if (password !== confirmPassword) {
      logger.error({
        type: "error",
        status: 400,
        message: "Password didn't Match",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message: "Password didn't Match",
      });
    }

    user.password = password;
    await user.save({ validateBeforeSave: false });
    await token.delete();

    logger.info({
      type: "success",
      status: 200,
      message: "Password Changed!",
    });

    return res.status(200).json({
      type: "success",
      status: 200,
      message: "Password Changed!",
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({
      type: "error",
      status: 404,
      message: "An Error Occured!",
    });
  }
};

const changePassword = async (req, res: Response, next: NextFunction) => {
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const pass_rgex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = req.user;

    const schema = Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
      confirmNewPassword: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      logger.error({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: error.details[0].message,
      });
    }

    const passwordIsValid = bcrypt.compareSync(currentPassword, user.password);

    if (!passwordIsValid) {
      logger.error({
        type: "error",
        status: 400,
        message: "Invalid Current Password!",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "Invalid Current Password!",
      });
    }

    if (!pass_rgex.test(newPassword)) {
      logger.error({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
    if (newPassword !== confirmNewPassword) {
      logger.error({
        type: "error",
        status: 400,
        message: "New Password and Confirm Password Is not same",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message: "New Password and Confirm Password Is not same",
      });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    logger.info({
      type: "success",
      status: 200,
      message: "Password changed successful",
      data: user,
    });
    return res.status(200).json({
      type: "success",
      status: 200,
      message: "Password changed successful",
      data: user,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(404).json({
      type: "error",
      status: 404,
      message: error.message,
    });
  }
};

const changeTempPassword = async (req, res) => {
  const pass_rgex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  try {
    const { email, tmp_password, new_password, confirm_password } = req.body;

    const schema = Joi.object({ email: Joi.string().email().required() });

    const user = await User.findOne({ email: email });

    if (!user) {
      logger.error({
        type: "error",
        status: 400,
        message: "user with given email doesn't exist",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "user with given email doesn't exist",
      });
    }

    const passwordIsValid = bcrypt.compareSync(tmp_password, user.password);
    if (!passwordIsValid) {
      logger.error({
        type: "error",
        status: 400,
        message: "Invalid Current Password!",
      });
      return res.status(400).send({
        type: "error",
        status: 400,
        message: "Invalid Current Password!",
      });
    }

    if (!pass_rgex.test(new_password)) {
      logger.error({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
    if (new_password !== confirm_password) {
      logger.error({
        type: "error",
        status: 400,
        message: "New Password and Confirm Password Is not same",
      });
      return res.status(400).json({
        type: "error",
        status: 400,
        message: "New Password and Confirm Password Is not same",
      });
    }

    user.password = new_password;
    await user.save({ validateBeforeSave: false });

    logger.info({
      type: "success",
      status: 200,
      message: "Password changed successful",
      data: user,
    });

    return res.status(200).json({
      type: "success",
      status: 200,
      message: "Password changed successful",
      data: user,
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({
      type: "error",
      status: 404,
      message: err.message,
    });
  }
};

const ListAllUsers = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    let { page, limit, sort, cond } = req.body;

    if (user) {
      cond = { ...cond };
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

    const result = await User.find(cond)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const result_count = await User.find(cond).count();
    const totalPages = Math.ceil(result_count / limit);

    logger.info({
      status: 200,
      type: "success",
      message: "Users Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result_count,
      data: result,
    });
    return res.status(200).json({
      status: 200,
      type: "success",
      message: "Users Fetch Successfully",
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result_count,
      data: result,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(404).json({
      type: "error",
      status: 404,
      message: error.message,
    });
  }
};

export default {
  forgotPassword,
  resetPassword,
  changePassword,
  changeTempPassword,
  ListAllUsers,
};
