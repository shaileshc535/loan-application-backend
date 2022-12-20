/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

enum RolesEnum {
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  USER = "user",
}

export interface IUser {
  firstname: string;
  midname?: string;
  lastname: string;
  fullname: string;
  email: string;
  phone?: number;
  password: string;
  role: RolesEnum;
  dob: string;
  gender: GenderEnum;
  profile_photo: string;
  is_active: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  activation_date: Date;
  default_app_name: string;
  apps: [
    {
      app_name: string;
    }
  ];
  permissions: [
    {
      read: boolean;
      edit: boolean;
      delete: boolean;
    }
  ];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: { type: String, required: true, minlength: 2, maxlength: 50 },

    midname: { type: String, required: false, maxlength: 50 },

    lastname: { type: String, required: false, maxlength: 50 },

    fullname: { type: String },

    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Email is not a valid Email",
      },
      required: true,
    },

    phone: { type: Number },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!.%*?&]{6,}$/.test(
            value
          );
        },
        message: "{VALUE} is not a valid password",
      },
    },

    role: { type: String, enum: RolesEnum },

    gender: { type: String, enum: GenderEnum },

    dob: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isDate(value, {
            format: "YYYY/MM/DD",
          });
        },
        message: "{VALUE} is not a valid date",
      },
    },

    profile_photo: { type: String },

    is_active: { type: Boolean, default: true },

    is_email_verified: { type: Boolean, default: false },

    is_phone_verified: { type: Boolean, default: false },

    default_app_name: { type: String, default: "free app" },

    activation_date: { type: Date, default: Date.now() },

    apps: [
      {
        app_name: { type: String },
      },
    ],

    permissions: [
      {
        read: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("name")
  .get(function (this: mongoose.HydratedDocument<IUser>) {
    return `${this.firstname} ${this.midname} ${this.lastname}`;
  });

userSchema.virtual("userApps", {
  ref: "apps",
  localField: "apps.app_name",
  foreignField: "_id",
  justOne: true,
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.pre("save", function (this: mongoose.HydratedDocument<IUser>, next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });

  user.email = user.email.toLowerCase();

  user.fullname = user.firstname + " " + user.midname + " " + user.lastname;
});

userSchema.methods.toJSON = function (this: mongoose.HydratedDocument<IUser>) {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePassword = function (
  this: mongoose.HydratedDocument<IUser>,
  password
) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

const User = mongoose.model("user", userSchema);
export default User;
