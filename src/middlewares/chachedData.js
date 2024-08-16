import redisClient from "../utils/general/redisConn";
import { errorResponse, successResponse } from "../utils/response";

const cachedData = async (req, res, next) => {
  try {
    const { country, year } = req.query;

    if (!country || !year) {
      return res
        .status(400)
        .send(errorResponse("Country and year are required parameters"));
    }
    let holidays;

    const cachedData = await redisClient.get(country);
    if (cachedData) {
      holidays = JSON.parse(cachedData);
      res
        .status(200)
        .send(
          successResponse(
            { holidays, fromCache: true },
            "Get country holidays successfully"
          )
        );
    } else {
      next();
    }
  } catch (error) {
    const { statusCode, message } = error || {};
    return res
      .status(statusCode || 500)
      .send(errorResponse(message || "Error getting country holidays."));
  }
};

export default cachedData;
