import { Schema, model, PopulatedDoc } from "mongoose";
import { IProductCategory } from "./productCategoryModel";

export interface IProductSubCategory {
  product_category_id: PopulatedDoc<IProductCategory>;
  name: string;
  slug: string;
  description: string;
  isdeleted: boolean;
  isactive: boolean;
}

const ProductSubCategorySchema = new Schema<IProductSubCategory>(
  {
    product_category_id: {
      type: Schema.Types.ObjectId,
      ref: "product_category",
    },
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

ProductSubCategorySchema.virtual("productCategory", {
  ref: "product_category",
  localField: "product_category_id",
  foreignField: "_id",
});

const product_subcategory = model(
  "product_subcategory",
  ProductSubCategorySchema
);

export default product_subcategory;
