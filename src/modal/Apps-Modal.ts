import { Schema, model } from "mongoose";

export interface IApps {
  _id: string;
  name: string;
  slug: string;
  privacy_policy: string;
  isdeleted: boolean;
  permission: Array<string>;
  roles: Array<string>;
}

const AppSchema = new Schema<IApps>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    permission: [{ type: String }],
    roles: [{ type: String }],
    privacy_policy: {
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

const apps = model("apps", AppSchema);

export default apps;
