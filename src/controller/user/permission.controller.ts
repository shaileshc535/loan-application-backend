import User from "../../modal/user";

const ActivateUser = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

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
      isactivated: true,
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
      message: "User Activated Successfully.",
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

const DeactivateUser = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

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
      isactivated: false,
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
      message: "User De-activated Successfully.",
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
        role: userId,
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
        role: userId,
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
        role: userId,
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

export default {
  ActivateUser,
  DeactivateUser,
  userRollUpdate,
  userPermissionsUpdate,
  userAppsUpdate,
};
