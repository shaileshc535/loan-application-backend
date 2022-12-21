import { Schema, model } from "mongoose";

export interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  timezones: [
    {
      zoneName: string;
      gmtOffset: string;
      gmtOffsetName: string;
      abbreviation: string;
      tzName: string;
    }
  ];
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

const CountrySchema = new Schema<ICountry>(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    iso3: {
      type: String,
    },
    iso2: {
      type: String,
    },
    numeric_code: {
      type: String,
    },
    phone_code: {
      type: String,
    },
    capital: {
      type: String,
    },
    currency: {
      type: String,
    },
    currency_name: {
      type: String,
    },
    currency_symbol: {
      type: String,
    },
    tld: {
      type: String,
    },
    native: {
      type: String,
    },
    region: {
      type: String,
    },
    subregion: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    emoji: {
      type: String,
    },
    emojiU: {
      type: String,
    },
    timezones: [
      {
        zoneName: {
          type: String,
        },
        gmtOffset: {
          type: String,
        },
        gmtOffsetName: {
          type: String,
        },
        abbreviation: {
          type: String,
        },
        tzName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const countries = model("countries", CountrySchema);

export default countries;
