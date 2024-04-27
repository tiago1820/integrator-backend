const { config } = require("dotenv");
config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME
const RM_API_CHARACTER = process.env.RM_API_CHARACTER;

module.exports = { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, RM_API_CHARACTER }