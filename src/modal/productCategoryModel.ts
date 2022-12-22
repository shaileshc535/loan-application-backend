import { Schema, model } from "mongoose";

export interface IProductCategory {
  name: string;
  slug: string;
  description: string;
  isactive: boolean;
  isdeleted: boolean;
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
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

const product_category = model("product_category", ProductCategorySchema);

export default product_category;
