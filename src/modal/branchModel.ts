import { Schema, model, PopulatedDoc } from "mongoose";
import { ICountry } from "./countryModal";
import { IState } from "./stateModel";
import { ICity } from "./cityModel";

export interface IBranch {
  branch_name: string;
  branch_code: string;
  address: string;
  landmark: string;
  city: PopulatedDoc<ICity>;
  state: PopulatedDoc<IState>;
  country: PopulatedDoc<ICountry>;
  pincode: string;
  phone: string;
  fax: string;
  isactive: boolean;
  isdeleted: boolean;
}

const BranchSchema = new Schema<IBranch>(
  {
    branch_name: {
      type: String,
      required: true,
    },
    branch_code: {
      type: String,
    },
    address: {
      type: String,
    },
    landmark: {
      type: String,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "states",
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "countries",
    },
    pincode: {
      type: String,
    },
    phone: {
      type: String,
    },
    fax: {
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

BranchSchema.virtual("cityname", {
  ref: "cities",
  localField: "city",
  foreignField: "_id",
});

BranchSchema.virtual("statename", {
  ref: "states",
  localField: "state",
  foreignField: "_id",
});

BranchSchema.virtual("countryname", {
  ref: "countries",
  localField: "country",
  foreignField: "_id",
});

const branch = model("branch", BranchSchema);

export default branch;
