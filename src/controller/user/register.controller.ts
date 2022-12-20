/* eslint-disable no-useless-escape */
import jwt from "jsonwebtoken";
import validator from "email-validator";
import User from "../../modal/user";
import sendEmail from "../../services/sendEmail";

const register = async (req, res) => {
  try {
    const registerData = req.body;

    if (!registerData.email) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email is required.",
      });
    } else {
      if (!validator.validate(registerData.email)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Please enter a valid email.",
        });
      } else {
        const user_count = await User.find({ email: registerData.email });
        if (user_count.length != 0) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "User already exist.",
          });
        } else {
          if (user_count.length != 0) {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "This Email is already assiociate with us.",
            });
          }
        }
      }
    }

    if (!registerData.phone) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter your phone number.",
      });
    } else {
      const user_count = await User.find({ phone: registerData.phone });
      if (user_count.length != 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Phone number already in use.",
        });
      }
    }

    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must not contain Whitespaces.",
      });
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must have at least one Uppercase Character.",
      });
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must have at least one Lowercase Character.",
      });
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must contain at least one Digit.",
      });
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must contain at least one Special Symbol.",
      });
    }

    const isValidLength = /^.{6,16}$/;
    if (!isValidLength.test(registerData.password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must be 6-16 Characters Long.",
      });
    }

    if (registerData.password != registerData.confirmPassword) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password and confirm Password dosen't match.",
      });
    }

    const user = new User({ ...req.body });

    let data = await user.save();

    data = JSON.parse(JSON.stringify(data));

    await sendEmail(
      data.email,
      "Congratulations Account Created Successfully",
      "Congratulations your account is created. Please add your professional info and wait for the admin approval."
    );

    const response = await User.findByIdAndUpdate(data._id, { new: true });

    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User Registration Successfully",
      data: {
        ...response.toObject(),
        token: token,
      },
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

export default register;
