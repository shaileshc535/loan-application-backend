import jwt from "jsonwebtoken";
import User from "../../modal/user";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;
  const verifiedEmail = email.toLowerCase();
  try {
    User.findOne({
      email: verifiedEmail,
    }).exec((err, user) => {
      if (err) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: err,
        });
      }
      if (!user) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "User Not Found",
        });
      }

      if (user.is_active !== true) {
        return res.status(400).send({
          status: 400,
          success: false,
          message:
            "Your Account is not Activated. Please Contact with Admin to re-activate your account.",
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, //24 hours
      });

      res.status(200).send({
        status: 200,
        success: true,
        message: "User Successfully Logged-In",
        data: {
          ...user.toObject(),
          token: token,
        },
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      errors: error.message,
      msg: "Something went wrong. Please try again",
    });
  }
};

export default login;
