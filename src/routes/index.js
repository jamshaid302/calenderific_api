import express from "express";
import countryHolidaysRoutes from "./holidays.routes";

const router = express.Router();

router.use("/", countryHolidaysRoutes);

export default router;
