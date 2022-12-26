import { Schema, model } from "mongoose";

export interface ILoanCategory {
  name: string;
  slug: string;
  type: string;
  isdeleted: boolean;
  isactive: boolean;
}

const LoanCategorySchema = new Schema<ILoanCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    type: {
      type: String,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    isactive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const loan_category = model("loan_category", LoanCategorySchema);

export default loan_category;
