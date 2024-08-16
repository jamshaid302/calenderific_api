import * as dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
};

start().then(() => console.log(`Server started at: ${PORT}`));
