# Shopify GraphQL Admin API Integration

This Node.js project demonstrates how to interact with the Shopify GraphQL Admin API. It allows users to fetch products from a Shopify store, list product variants, and sort them by price using GraphQL.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Script](#running-the-script)
- [Usage Example](#usage-example)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- **Shopify Store**: You need access to a Shopify store and an Admin API token to authenticate with the Shopify API.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elegant-idn/shopify-graphql-admin.git
   cd shopify-graphql-admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

To keep sensitive information like API tokens secure, this project uses a `.env` file to store environment variables.

1. Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

2. Add the following variables to your `.env` file:

   ```env
   SHOPIFY_ADMIN_URL=https://your-shopify-store.myshopify.com/admin/api/2023-10/graphql.json
   ADMIN_API_TOKEN=your-shopify-admin-api-token
   ```

> **Important**: Never share or commit your `.env` file to version control. Ensure that `.env` is listed in your `.gitignore` file.

### Running the Script

After setting up the environment variables, you can run the script to fetch products and their variants.

#### Fetch Products by Name

To fetch specific products by name and list their variants:

```bash
node app.js --name "product-name"
```

### Usage Example

#### Example Output:

Product A - Variant 1 - price $8

Product A - Variant 2 - price $10

Product B - Variant 1 - price $12

Product C - Variant 1 - price $15
