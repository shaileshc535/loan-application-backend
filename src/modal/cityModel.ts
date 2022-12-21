import { Schema, model } from "mongoose";

export interface ICity {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: string;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
}

const CitySchema = new Schema<ICity>(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    state_id: {
      type: Number,
    },
    state_code: {
      type: String,
    },
    state_name: {
      type: String,
    },
    country_id: {
      type: String,
    },
    country_code: {
      type: String,
    },
    country_name: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    wikiDataId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const cities = model("cities", CitySchema);

export default cities;
