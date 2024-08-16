import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const apiKey = process.env.CALENDARIFIC_API_KEY;
const apiBaseUrl = process.env.CALENDARIFIC_API_URL;

async function fetchCountryHolidays(country, year) {
  const apiUrl = `${apiBaseUrl}/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
  const response = await axios.get(apiUrl);
  const holidays = response.data.response.holidays;
  return holidays;
}

export { fetchCountryHolidays };
