import dotenv from "dotenv";
dotenv.config();

export const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN!;
export const FB_BUSINESS_ID = process.env.FB_BUSINESS_ID!;
export const FB_CATALOG_ID = process.env.FB_CATALOG_ID!;
export const PRODUCT_ADDITION = process.env.PRODUCT_ADDITION === "TRUE";
