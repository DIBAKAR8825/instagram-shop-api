
# Instagram Shop API Documentation

A **Node.js + TypeScript REST API** to add products to your **Instagram/Facebook Shop** using the **Meta Graph API**.  

This project allows dynamic uploading of products to your **Facebook Catalog**, making them available for Instagram Shopping once approved.

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Project Overview & Logic](#project-overview--logic)  
3. [Setup Instructions](#setup-instructions)  
4. [REST API Usage](#rest-api-usage)  
5. [cURL Example](#curl-example)  
6. [Facebook Graph API Steps](#facebook-graph-api-steps)  
    - [Get Business ID](#get-business-id)  
    - [Get Owned Catalogs](#get-owned-catalogs)  
7. [Validation](#validation)  
8. [Notes & Best Practices](#notes--best-practices)  

---

## Prerequisites

1. **Facebook Business Account** connected to your Instagram Business Account.  
2. **Facebook Catalog** created in Commerce Manager.  
3. **Facebook App** with `catalog_management` permission.  
4. **Access Token** with `catalog_management` and `business_management` scopes.  
5. **Node.js** v16+ and **npm** installed.  

---

## Project Overview & Logic

- The REST API exposes an endpoint `/add-product` to receive product details as JSON.  
- The server sends the product data to the **Facebook Graph API** to add it to the specified catalog.  
- Products are returned with success/error response including product ID.  
- Once approved by Facebook, products can be tagged and sold on Instagram.  

**Price Handling:**  
- Price must be an **integer** in the smallest currency unit (e.g., INR ₹1200 → 120000 paise).  

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd instagram-shop-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:

```env
FB_ACCESS_TOKEN=YOUR_LONG_LIVED_ACCESS_TOKEN
FB_BUSINESS_ID=YOUR_BUSINESS_ID
FB_CATALOG_ID=YOUR_CATALOG_ID
PRODUCT_ADDITION=TRUE
```

### 4. Run the Server (Development Mode)
```bash
npm run dev
```
You should see:
```
Server running at http://localhost:3000
```

### 5. Build for Production
```bash
npm run build
npm start
```

---

## REST API Usage

### Add Product Endpoint
**POST /add-product**  

**Headers:**  
`Content-Type: application/json`  

**Request Body:**

```json
{
  "retailer_id": "LB7045",
  "name": "Rolex Oyster Perpetual 41mm Steel Green Dial Ref: 134300 – Full Set – 2025",
  "description": "Premium cotton shirt for men – breathable and soft.",
  "image_url": "https://www.theluxuryhut.com/shop/wp-content/uploads/2025/10/Rolex_Oyster_Perpetual_41mm_Steel_Green_Update_LB704-aa.jpg",
  "url": "https://www.theluxuryhut.com/shop/product/rolex-oyster-perpetual-41mm-steel-green-dial-2025-ref-134300/",
  "brand": "Rolex",
  "price": "120000",
  "currency": "GBP",
  "availability": "in stock",
  "condition": "new"
}
```

---

## cURL Example

```bash
curl --location 'http://localhost:3000/add-product' --header 'Content-Type: application/json' --data '{
  "retailer_id": "LB7045",
  "name": "Rolex Oyster Perpetual 41mm Steel Green Dial Ref: 134300 – Full Set – 2025",
  "description": "Premium cotton shirt for men – breathable and soft.",
  "image_url": "https://www.theluxuryhut.com/shop/wp-content/uploads/2025/10/Rolex_Oyster_Perpetual_41mm_Steel_Green_Update_LB704-aa.jpg",
  "url": "https://www.theluxuryhut.com/shop/product/rolex-oyster-perpetual-41mm-steel-green-dial-2025-ref-134300/",
  "brand": "Rolex",
  "price": "120000",
  "currency": "GBP",
  "availability": "in stock",
  "condition": "new"
}'
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "987654321098765",
    "retailer_id": "LB7045"
  }
}
```

---

## Facebook Graph API Steps

### Get Business ID
Retrieve all businesses linked to your user account:

```http
GET https://graph.facebook.com/v24.0/me/businesses?access_token=<ACCESS_TOKEN>

GET https://graph.facebook.com/v24.0/me/businesses?access_token=EAAbAiJ1JfkABP02ZCp9jQEU2gMhmFZCyBXMuEzTcbxo3Jgh8AMKAUvv1ZBZAbvgJK90jsc2FR5zAAvYm3ZBVz8JX2RndS44ODvsVlkjZCXxIKcdWMUDDS9PJodz2BOkXYmItGHiFRAsu14SICAhp9VzilMxhUAx7QDaUEhp2G9M6lF56dFHhfGtVicXTer4lTfeej7YQhylNZCinHh4i7uLwnCnSl55wyLauxZCpzcZAu6e7uZCIPq3DuQCmkQIApVgkUHRqm0sETfEhJV4M8oz4zb4Mjn
```

**Example Response:**

```json
{
  "data": [
    { "id": "2529733907397210", "name": "Dibakar's" },
    { "id": "1807716330143536", "name": "Dibakar World" },
    { "id": "731153269925016", "name": "Dibakar" }
  ]
}
```

> Choose the `id` of the business you want to manage, e.g., `731153269925016`.

---

### Get Owned Catalogs
Retrieve all product catalogs owned by a business:

```http
GET https://graph.facebook.com/v24.0/<BUSINESS_ID>?fields=owned_product_catalogs&access_token=<ACCESS_TOKEN>

GET https://graph.facebook.com/v24.0/731153269925016?fields=owned_product_catalogs&access_token=EAAbAiJ1JfkABP02ZCp9jQEU2gMhmFZCyBXMuEzTcbxo3Jgh8AMKAUvv1ZBZAbvgJK90jsc2FR5zAAvYm3ZBVz8JX2RndS44ODvsVlkjZCXxIKcdWMUDDS9PJodz2BOkXYmItGHiFRAsu14SICAhp9VzilMxhUAx7QDaUEhp2G9M6lF56dFHhfGtVicXTer4lTfeej7YQhylNZCinHh4i7uLwnCnSl55wyLauxZCpzcZAu6e7uZCIPq3DuQCmkQIApVgkUHRqm0sETfEhJV4M8oz4zb4Mjn
```

**Example Response:**

```json
{
  "owned_product_catalogs": {
    "data": [
      { "id": "754715310627450", "name": "Catalogue_Products" },
      { "id": "1060339972837724", "name": "Catalogue_Products2" }
    ]
  }
}
```

> Use the **Catalog ID** when adding products via the Graph API.

---

## Validation

1. **Via Graph API:**
```http
GET https://graph.facebook.com/v24.0/<CATALOG_ID>/products?access_token=<ACCESS_TOKEN>
```

2. **Via Commerce Manager:**
- Go to [Commerce Manager](https://www.facebook.com/commerce_manager/)  
- Open your Catalog → Items → Check added products.

3. **On Instagram:**
- Tag products in posts/reels once approved and synced.

---

## Notes & Best Practices

- Ensure the **access token** has `catalog_management` and `business_management` permissions.  
- Prices must be integers in the smallest currency unit.  
- Only approved products appear on Instagram.  
- Keep `.env` secure and do not commit it to source control.  
- Validate product data before sending to the API.  
- For batch uploads, send multiple `/add-product` requests programmatically.

