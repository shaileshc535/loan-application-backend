"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CountrySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const countries = (0, mongoose_1.model)("countries", CountrySchema);
exports.default = countries;
//# sourceMappingURL=countryModal.js.map