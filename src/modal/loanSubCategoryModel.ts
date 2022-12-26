import { Schema, model, PopulatedDoc } from "mongoose";
import { ILoanCategory } from "./loanCategoryModel";

export interface ILoanSubCategory {
  loan_category_id: PopulatedDoc<ILoanCategory>;
  name: string;
  slug: string;
  type: string;
  isdeleted: boolean;
  isactive: boolean;
}

const LoanSubCategorySchema = new Schema<ILoanSubCategory>(
  {
    loan_category_id: {
      type: Schema.Types.ObjectId,
      ref: "loanCategory",
    },
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

LoanSubCategorySchema.virtual("loanCategory", {
  ref: "loanCategory",
  localField: "loan_category_id",
  foreignField: "_id",
});

const loan_subcategory = model("loan_subcategory", LoanSubCategorySchema);

export default loan_subcategory;
