import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: "../.env" });
}

export const API_URL = "https://jsonplaceholder.typicode.com/posts";
export const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING || "";