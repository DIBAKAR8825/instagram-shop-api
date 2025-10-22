import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { addProductToCatalog, Product } from "./facebookApi";
import { PRODUCT_ADDITION } from "./config";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Health Check
app.get("/", (_req, res) => {
  res.send("Instagram Shop API running");
});

// Add Product Endpoint
app.post("/add-product", async (req: Request, res: Response) => {
  if (!PRODUCT_ADDITION) {
    return res.status(403).json({ message: "Product addition is disabled" });
  }

  const product: Product = req.body;

  try {
    const result = await addProductToCatalog(product);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
