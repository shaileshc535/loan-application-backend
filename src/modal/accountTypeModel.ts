import { Schema, model } from "mongoose";

export interface IAccountType {
  name: string;
  description: string;
  isactive: boolean;
  isdeleted: boolean;
}

const AccountTypeSchema = new Schema<IAccountType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
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

const account_type = model("account_type", AccountTypeSchema);

export default account_type;
