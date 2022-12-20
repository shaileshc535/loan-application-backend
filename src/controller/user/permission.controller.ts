import User from "../../modal/user";

const ActivateUser = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to activate user.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      is_active: !findUser.is_active,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Activation Status Changed Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

const userRollUpdate = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to change user role.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      role: req.body.role,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Role Updated Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

const userPermissionsUpdate = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to update user permissions.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      permissions: req.body.permissions,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Permissions Updated Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

const userAppsUpdate = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to update user apps.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      apps: req.body.apps,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Apps Updated Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

const UserEmailVerify = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to verify Email Details.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      is_email_verified: !findUser.is_email_verified,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Email Verification Status Changed Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

const UserPhoneVerify = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (user.role != "admin") {
      return res.status(200).json({
        status: false,
        type: "success",
        message: "You are not authorise to verify Phone Details.",
        data: "",
      });
    }

    const userId = req.body.userId;

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        type: "success",
        message: "User Not Found.",
      });
    }

    const data = {
      is_phone_verified: !findUser.is_phone_verified,
    };

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data
    );

    const result = await User.findById({ _id: userId });

    res.status(200).json({
      status: true,
      type: "success",
      message: "User Phone Verification Status Changed Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      type: "error",
      message: error,
    });
  }
};

export default {
  ActivateUser,
  userRollUpdate,
  userPermissionsUpdate,
  userAppsUpdate,
  UserEmailVerify,
  UserPhoneVerify,
};
