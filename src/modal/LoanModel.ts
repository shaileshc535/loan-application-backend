import { Schema, model, PopulatedDoc } from "mongoose";
import { ILoanCategory } from "./loanCategoryModel";
import { ILoanSubCategory } from "./loanSubCategoryModel";
import { IUser } from "./user";

export interface ILoan {
  loan_category_id: PopulatedDoc<ILoanCategory>;
  loan_sub_category_id: PopulatedDoc<ILoanSubCategory>;
  user_id: PopulatedDoc<IUser>;
  name: string;
  slug: string;
  type: string;
  isactive: boolean;
  isdeleted: boolean;
}

const LoanSchema = new Schema<ILoan>(
  {
    loan_category_id: {
      type: Schema.Types.ObjectId,
      ref: "loanCategory",
      required: true,
    },
    loan_sub_category_id: {
      type: Schema.Types.ObjectId,
      ref: "loanSubCategory",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    type: {
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

LoanSchema.virtual("loanCategory", {
  ref: "loanCategory",
  localField: "loan_category_id",
  foreignField: "_id",
});

LoanSchema.virtual("loanSubCategory", {
  ref: "loanSubCategory",
  localField: "loan_sub_category_id",
  foreignField: "_id",
});

LoanSchema.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
});

const loan = model("loan", LoanSchema);

export default loan;
