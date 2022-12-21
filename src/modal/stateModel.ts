import { Schema, model } from "mongoose";

export interface IState {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string;
  latitude: string;
  longitude: string;
}

const StateSchema = new Schema<IState>(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    country_id: {
      type: Number,
    },
    country_code: {
      type: String,
    },
    country_name: {
      type: String,
    },
    state_code: {
      type: String,
    },
    type: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const states = model("states", StateSchema);

export default states;
