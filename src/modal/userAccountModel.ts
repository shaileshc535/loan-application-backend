import { Schema, model, PopulatedDoc } from "mongoose";
import { IUser } from "./user";
import { IBranch } from "./branchModel";
import { IAccountType } from "./accountTypeModel";
import { IUserAddress } from "./userAddressModel";

export interface IUserAccount {
  user_id: PopulatedDoc<IUser>;
  user_address_id: PopulatedDoc<IUserAddress>;
  account_type: PopulatedDoc<IAccountType>;
  branch_id: PopulatedDoc<IBranch>;
  account_no: number;
  balance: number;
  transction_id: string;
  transction_amount: number;
  transction_type: string;
  transction_date: string;
  isactive: boolean;
  isdeleted: boolean;
}

const UserAccountSchema = new Schema<IUserAccount>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user_address_id: {
      type: Schema.Types.ObjectId,
      ref: "user_address",
    },
    account_type: {
      type: Schema.Types.ObjectId,
      ref: "account_type",
    },
    branch_id: {
      type: Schema.Types.ObjectId,
      ref: "branch",
    },
    account_no: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
    },
    transction_amount: {
      type: Number,
    },
    transction_id: {
      type: String,
    },
    transction_type: {
      type: String,
    },
    transction_date: {
      type: String,
    },
    isactive: {
      type: Boolean,
      default: true,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserAccountSchema.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
});

UserAccountSchema.virtual("user_address", {
  ref: "user_address",
  localField: "user_address_id",
  foreignField: "_id",
});

UserAccountSchema.virtual("accountType", {
  ref: "account_type",
  localField: "account_type",
  foreignField: "_id",
});

UserAccountSchema.virtual("branch", {
  ref: "branch",
  localField: "branch_id",
  foreignField: "_id",
});

const user_account = model("user_account", UserAccountSchema);

export default user_account;
