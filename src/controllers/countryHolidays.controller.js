import { errorResponse, successResponse } from "../utils/response";
import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { fetchCountryHolidays } from "../utils/helper";
import redisClient from "../utils/general/redisConn";

const apiKey = process.env.CALENDARIFIC_API_KEY;
const apiBaseUrl = process.env.CALENDARIFIC_API_URL;

export const getCountries = async (req, res) => {
  try {
    const apiUrl = `${apiBaseUrl}/countries?api_key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const countries = response.data.response.countries;
    return res
      .status(200)
      .send(successResponse(countries, "Get Supported Countries successfully"));
  } catch (error) {
    const { statusCode, message } = error || {};
    return res
      .status(statusCode || 500)
      .send(errorResponse(message || "Error getting supported countries."));
  }
};

export const getCountryHolidays = async (req, res) => {
  try {
    const { country, year } = req.query;

    if (!country || !year) {
      return res
        .status(400)
        .send(errorResponse("Country and year are required parameters"));
    }

    const holidays = await fetchCountryHolidays(country, year);

    await redisClient.set(country, JSON.stringify(holidays), {
      EX: 3600, // 3600 seconds
      NX: true, // Only set the key if it does not already exist in redis
    });

    return res
      .status(200)
      .send(
        successResponse(
          { holidays, fromCache: false },
          "Get country holidays successfully"
        )
      );
  } catch (error) {
    const { statusCode, message } = error || {};
    return res
      .status(statusCode || 500)
      .send(errorResponse(message || "Error getting country holidays."));
  }
};
