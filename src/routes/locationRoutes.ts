import express from "express";
import controller from "../controller/location/locationController";

const router = express.Router();

router.post("/country-list", controller.CountryList);

router.post("/state-list", controller.StateList);

router.post("/city-list", controller.CityList);

export default router;
