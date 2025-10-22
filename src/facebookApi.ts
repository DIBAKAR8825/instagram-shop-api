import axios from "axios";
import { FB_ACCESS_TOKEN, FB_CATALOG_ID } from "./config";

export interface Product {
  retailer_id: string;
  name: string;
  description: string;
  image_url: string;
  url: string;
  brand: string;
  price: string;
  currency: string;
  availability: string;
  condition: string;
}

export async function addProductToCatalog(product: Product) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v24.0/${FB_CATALOG_ID}/products`,
      product,
      { params: { access_token: FB_ACCESS_TOKEN } }
    );
    console.log("Product Added:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding product:", error.response?.data || error.message);
    throw error;
  }
}
