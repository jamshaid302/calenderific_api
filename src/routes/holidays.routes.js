import express from "express";
import {
  getCountries,
  getCountryHolidays,
} from "../controllers/countryHolidays.controller";
import { cachedData } from "../middlewares";

const router = express.Router();

router.get("/countries", getCountries);
router.get("/holidays", cachedData, getCountryHolidays);

export default router;
