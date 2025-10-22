import axios from "axios";
import { FB_ACCESS_TOKEN, FB_CATALOG_ID } from "./config";

export interface Product {
  retailer_id: string;
  name: string;
  description: string;
  image_url: string;
  url: string;
  brand: string;
  price: string; // smallest unit e.g. 120000 for INR 1200
  currency: string;
  availability: string;
  condition: string;
}

export async function addProductToCatalog(product: Product) {
  const response = await axios.post(
    `https://graph.facebook.com/v19.0/${FB_CATALOG_ID}/products`,
    product,
    { params: { access_token: FB_ACCESS_TOKEN } }
  );
  return response.data;
}
