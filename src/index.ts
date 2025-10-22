import { addProductToCatalog, Product } from "./facebookApi";
import { PRODUCT_ADDITION } from "./config";

async function main() {
  if (!PRODUCT_ADDITION) {
    console.log("Product addition is disabled.");
    return;
  }

  const priceInRupees = 1200.00;
const priceInPaise = Math.round(priceInRupees * 100).toString();

const newProduct: Product = {
  retailer_id: "LB704",
  name: "Rolex Oyster Perpetual 41mm Steel Green Dial Ref: 134300 – Full Set – 2025",
  description: "Premium cotton shirt for men – breathable and soft.",
  image_url: "https://www.theluxuryhut.com/shop/wp-content/uploads/2025/10/Rolex_Oyster_Perpetual_41mm_Steel_Green_Update_LB704-aa.jpg",
  url: "https://www.theluxuryhut.com/shop/product/rolex-oyster-perpetual-41mm-steel-green-dial-2025-ref-134300/",
  brand: "Rolex",
  price: priceInPaise,
  currency: "GBP",
  availability: "in stock",
  condition: "new",
};

  await addProductToCatalog(newProduct);
}

main();
