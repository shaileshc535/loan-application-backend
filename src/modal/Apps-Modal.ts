import { Schema, model } from "mongoose";

export interface IApps {
  name: string;
  slug: string;
  privacy_policy: string;
  permission: Array<string>;
  roles: Array<string>;
  isdeleted: boolean;
  isactive: boolean;
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
    isactive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const apps = model("apps", AppSchema);

export default apps;
