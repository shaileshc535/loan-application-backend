import { Schema, model, PopulatedDoc } from "mongoose";
import { IBlogCategory } from "./blogCategoryModel";
import { IUser } from "./user";

export interface IBlog {
  author: PopulatedDoc<IUser>;
  category: PopulatedDoc<IBlogCategory>;
  title: string;
  slug: string;
  description: string;
  summary: string;
  main_image: string;
  isactive: boolean;
  isdeleted: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "blog_category",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    summary: {
      type: String,
    },
    main_image: {
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

BlogSchema.virtual("blogCategory", {
  ref: "blog_category",
  localField: "category",
  foreignField: "_id",
});

BlogSchema.virtual("blogAuthor", {
  ref: "user",
  localField: "author",
  foreignField: "_id",
});

const blog = model("blog", BlogSchema);

export default blog;
