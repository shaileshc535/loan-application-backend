import { Schema, model, PopulatedDoc } from "mongoose";
import { IProductCategory } from "./productCategoryModel";
import { IProductSubCategory } from "./productSubCategoryModel";

export interface IProduct {
  product_category_id: PopulatedDoc<IProductCategory>;
  product_sub_category_id: PopulatedDoc<IProductSubCategory>;
  name: string;
  slug: string;
  description: string;
  isactive: boolean;
  isdeleted: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    product_category_id: {
      type: Schema.Types.ObjectId,
      ref: "product_category",
      required: true,
    },
    product_sub_category_id: {
      type: Schema.Types.ObjectId,
      ref: "product_subcategory",
    },
    name: {
      type: String,
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

ProductSchema.virtual("productCategory", {
  ref: "product_category",
  localField: "product_category_id",
  foreignField: "_id",
});

ProductSchema.virtual("productSubCategory", {
  ref: "product_subcategory",
  localField: "product_sub_category_id",
  foreignField: "_id",
});

const product = model("product", ProductSchema);

export default product;
