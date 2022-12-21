import { Schema, model, PopulatedDoc } from "mongoose";
import { IUser } from "./user";
import { ICountry } from "./countryModal";
import { IState } from "./stateModel";
import { ICity } from "./cityModel";

enum AddressTypeEnum {
  HOME = "home",
  OFFICE = "office",
  OTHER = "other",
}

export interface IUserAddress {
  user_id: PopulatedDoc<IUser>;
  contact_person: {
    firstname: string;
    midname: string;
    lastname: string;
    phone: string;
    alternate_phone: string;
  };
  phonecode: string;
  house_no: string;
  street: string;
  address: string;
  landmark: string;
  city: PopulatedDoc<ICountry>;
  state: PopulatedDoc<IState>;
  country: PopulatedDoc<ICity>;
  pincode: string;
  type: AddressTypeEnum;
  isactive: boolean;
  isdeleted: boolean;
  isprimary: boolean;
}

const UserAddressSchema = new Schema<IUserAddress>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    contact_person: {
      firstname: {
        type: String,
      },
      midname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      phone: {
        type: String,
      },
      alternate_phone: {
        type: String,
      },
    },
    phonecode: {
      type: String,
    },
    house_no: {
      type: String,
    },
    street: {
      type: String,
    },
    address: {
      type: String,
      required: true,
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
    type: {
      type: String,
      enum: AddressTypeEnum,
    },
    isactive: {
      type: Boolean,
      default: true,
    },
    isprimary: {
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

UserAddressSchema.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
});

UserAddressSchema.virtual("cityname", {
  ref: "cities",
  localField: "city",
  foreignField: "_id",
});

UserAddressSchema.virtual("statename", {
  ref: "states",
  localField: "state",
  foreignField: "_id",
});

UserAddressSchema.virtual("countryname", {
  ref: "countries",
  localField: "country",
  foreignField: "_id",
});

const user_address = model("user_address", UserAddressSchema);

export default user_address;
