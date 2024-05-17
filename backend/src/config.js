

import dotenv from "dotenv";
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY || "mytokenkey";
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "30d";
const NODE_ENV = process.env.NODE_ENV || "production";


export {
  TOKEN_KEY,
  TOKEN_EXPIRY,
  NODE_ENV,
};