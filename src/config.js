import dotenv from "dotenv";
dotenv.config();

export const ENV = process.env.NODE_ENV;

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  tables: process.env.DB_TABLES ? process.env.DB_TABLES.split(",") : undefined,
};

export const MAIL_CONFIG = {
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    host: process.env.MAIL_HOST,
  },
};
