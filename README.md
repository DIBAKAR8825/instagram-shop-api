# Instagram Shop API

A **Node.js + TypeScript REST API** to add products to your **Instagram/Facebook Shop** using the **Meta Graph API**.  

This project allows you to dynamically upload products to your **Facebook Catalog** and makes them available for Instagram Shopping once approved.  

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Project Logic](#project-logic)  
3. [Setup Instructions](#setup-instructions)  
4. [REST API Usage](#rest-api-usage)  
5. [Validation](#validation)  

---

## Prerequisites

Before using this project, ensure you have:

1. **Facebook Business Account** connected to your Instagram Business Account.  
2. **Facebook Catalog** created in Commerce Manager.  
3. **Facebook App** with `catalog_management` permission.  
4. **Access Token** with `catalog_management` and `business_management` scopes.  
5. **Node.js** v16+ and **npm** installed.  

---

## Project Logic

The project workflow is simple:

1. A REST API `/add-product` receives a JSON payload with product details.  
2. The server calls **Facebook Graph API** to add the product to the specified catalog.  
3. The API returns success/error with product info.  
4. Products can then be tagged and sold on Instagram once approved by Meta.  

**Price Handling:**  
- Price must be an **integer** in the smallest currency unit (e.g., INR ₹1200 → 120000 paise).  

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd instagram-shop-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in project root

```env
FB_ACCESS_TOKEN=YOUR_LONG_LIVED_ACCESS_TOKEN
FB_BUSINESS_ID=YOUR_BUSINESS_ID
FB_CATALOG_ID=YOUR_CATALOG_ID
PRODUCT_ADDITION=TRUE
```

### 4. Run the server (development mode)

```bash
npm run dev
```

✅ You should see:

```
Server running at http://localhost:3000
```

### 5. Build for production

```bash
npm run build
npm start
```

---

## REST API Usage

### Add Product

**Endpoint:** `POST /add-product`
**Headers:** `Content-Type: application/json`
**Body Example:**

```json
{
  "retailer_id": "SKU12345",
  "name": "Stylish Cotton Shirt",
  "description": "Premium cotton shirt for men – breathable and soft.",
  "image_url": "https://example.com/images/shirt.jpg",
  "url": "https://example.com/product/shirt",
  "brand": "NextZen Apparel",
  "price": "120000",
  "currency": "INR",
  "availability": "in stock",
  "condition": "new"
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "987654321098765",
    "retailer_id": "SKU12345"
  }
}
```

---

## Validation

1. **Via Graph API:**

```bash
GET https://graph.facebook.com/v19.0/<CATALOG_ID>/products?access_token=<ACCESS_TOKEN>
```

2. **Via Commerce Manager:**

* Go to [Commerce Manager](https://www.facebook.com/commerce_manager/)
* Open your Catalog → Items → Check added products.

3. **On Instagram:**

* Tag products in posts/reels once approved and synced.

---

## Notes

* Ensure the **access token** is valid and has correct permissions.
* Prices must be integers in the smallest currency unit.
* Only approved products appear on Instagram.