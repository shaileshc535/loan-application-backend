"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationController_1 = __importDefault(require("../controller/location/locationController"));
const router = express_1.default.Router();
router.post("/country-list", locationController_1.default.CountryList);
router.post("/state-list", locationController_1.default.StateList);
router.post("/city-list", locationController_1.default.CityList);
exports.default = router;
//# sourceMappingURL=locationRoutes.js.map