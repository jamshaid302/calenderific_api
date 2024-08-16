import request from "supertest";
import axios from "axios";
import { app } from "../app";

jest.mock("axios");

describe("API Endpoints", () => {
  describe("GET /countries", () => {
    it("should return a list of countries", async () => {
      const countriesMockData = {
        response: {
          countries: [
            {
              country_name: "Afghanistan",
              "iso-3166": "AF",
              total_holidays: 24,
              supported_languages: 2,
              uuid: "f0357a3f154bc2ffe2bff55055457068",
              flag_unicode: "🇦🇫",
            },
            {
              country_name: "Albania",
              "iso-3166": "AL",
              total_holidays: 33,
              supported_languages: 4,
              uuid: "97282b278e5d51866f8e57204e4820e5",
              flag_unicode: "🇦🇱",
            },
          ],
        },
      };

      axios.get.mockResolvedValue({ data: countriesMockData });

      const response = await request(app).get("/countries");

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(countriesMockData.response.countries);
    });

    it("should handle API errors", async () => {
      axios.get.mockRejectedValue(
        new Error("Failed to fetch supported countries")
      );

      const response = await request(app).get("/countries");

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.text).message).toBe(
        "Failed to fetch supported countries"
      );
    });
  });

  describe("GET /holidays", () => {
    it("should return a list of holidays for a given country and year", async () => {
      const holidaysMockData = {
        response: {
          holidays: [
            {
              name: "New Year's Day",
              description:
                "January 1 marks the beginning of the official New Year in Pakistan and is celebrated throughout the country as New Year’s Day.",
              country: {
                id: "pk",
                name: "Pakistan",
              },
              date: {
                iso: "2024-01-01",
                datetime: {
                  year: 2024,
                  month: 1,
                  day: 1,
                },
              },
              type: ["Optional holiday"],
              primary_type: "Optional Holiday",
              canonical_url:
                "https://calendarific.com/holiday/pakistan/new-year-day",
              urlid: "pakistan/new-year-day",
              locations: "All",
              states: "All",
            },
            {
              name: "January 1 Bank Holiday",
              description:
                "January 1 Bank Holiday is a bank holiday in Pakistan",
              country: {
                id: "pk",
                name: "Pakistan",
              },
              date: {
                iso: "2024-01-01",
                datetime: {
                  year: 2024,
                  month: 1,
                  day: 1,
                },
              },
              type: ["Common local holiday"],
              primary_type: "Bank Holiday",
              canonical_url:
                "https://calendarific.com/holiday/pakistan/january-1-bank-holiday",
              urlid: "pakistan/january-1-bank-holiday",
              locations: "All",
              states: "All",
            },
          ],
        },
      };

      axios.get.mockResolvedValue({ data: holidaysMockData });

      const response = await request(app).get("/holidays?country=US&year=2024");

      expect(response.statusCode).toBe(200);
      expect(response.body.data.holidays).toEqual(
        holidaysMockData.response.holidays
      );
    });

    it("should return 400 if country or year is missing", async () => {
      const response = await request(app).get("/holidays?country=US");

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        "Country and year are required parameters"
      );
    });

    it("should handle API errors", async () => {
      axios.get.mockRejectedValue(new Error("Error getting country holidays."));

      const response = await request(app).get("/holidays?country=US&year=2024");

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.text).message).toBe(
        "Error getting country holidays."
      );
    });
  });
});
