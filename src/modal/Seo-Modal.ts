import { Schema, model } from "mongoose";

export interface ISeo {
  page_name: string;
  page_url: string;
  meta_title: string;
  meta_description: string;
  heading_tags: string;
  seo_icon: string;
  web_icon: string;
  isdeleted: boolean;
}

const SeoSchema = new Schema<ISeo>(
  {
    page_name: {
      type: String,
      required: true,
    },
    page_url: {
      type: String,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    heading_tags: {
      type: String,
    },
    seo_icon: {
      type: String,
    },
    web_icon: {
      type: String,
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

const seo_modal = model("seo_modal", SeoSchema);

export default seo_modal;
