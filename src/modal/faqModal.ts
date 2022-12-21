import { Schema, model, PopulatedDoc } from "mongoose";
import { IUser } from "./user";

export interface IFAQ {
  author: PopulatedDoc<IUser>;
  title: string;
  slug: string;
  description: string;
  isactive: boolean;
  isdeleted: boolean;
}

const FaqSchema = new Schema<IFAQ>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
      required: true,
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

FaqSchema.virtual("faqAuthor", {
  ref: "user",
  localField: "author",
  foreignField: "_id",
});

const faq = model("faq", FaqSchema);

export default faq;
