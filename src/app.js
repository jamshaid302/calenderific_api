import cors from "cors";
import express from "express";
import { requestLogger } from "./middlewares";
import router from "./routes";

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  try {
    res.send("server is running");
  } catch (error) {
    console.error(error);
  }
});

app.use("/", router);
