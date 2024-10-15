require("dotenv").config();

const axios = require("axios");
const yargs = require("yargs");

// Access environment variables using process.env
const SHOPIFY_ADMIN_URL = process.env.SHOPIFY_ADMIN_URL;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;

// Parse command-line arguments
const argv = yargs
  .option("name", {
    alias: "n",
    description: "Product name to search",
    type: "string",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv;

// Function to query Shopify API with GraphQL
const fetchProductVariants = async (productName) => {
  const query = `
        query($query: String!) {
            products(first: 10, query: $query) {
                edges {
                    node {
                        title
                        variants(first: 10) {
                            edges {
                                node {
                                    title
                                    price
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

  const variables = {
    query: `title:*${productName}*`,
  };

  try {
    const response = await axios.post(
      SHOPIFY_ADMIN_URL,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ADMIN_API_TOKEN,
        },
      }
    );

    const products = response.data.data.products.edges;

    if (!products || products.length === 0) {
      console.log("No products found for the given name.");
      return;
    }

    // Process and display the product variants sorted by price
    products.forEach((product) => {
      const title = product.node.title;
      let variants = product.node.variants.edges.map((variant) => ({
        title: variant.node.title,
        price: parseFloat(variant.node.price),
      }));

      // Sort variants by price
      variants = variants.sort((a, b) => a.price - b.price);

      variants.forEach((variant) => {
        console.log(`${title} - ${variant.title} - price $${variant.price}`);
      });
    });
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
  }
};

// Execute the function with the provided product name
fetchProductVariants(argv.name);
