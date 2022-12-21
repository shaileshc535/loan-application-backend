import { Schema, model } from "mongoose";

export interface IBlogCategory {
  name: string;
  slug: string;
  description: string;
  isactive: boolean;
  isdeleted: boolean;
}

const BlogCategorySchema = new Schema<IBlogCategory>(
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

const blogCategory = model("blogCategory", BlogCategorySchema);

export default blogCategory;
