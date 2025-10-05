const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://dining.ucla.edu/de-neve-dining/";

// Step 1: Get menu items and detail links
async function getMenuItems() {
  const { data } = await axios.get(BASE_URL);
  const $ = cheerio.load(data);

  const items = $(".menu-item-title")
    .map((_, el) => {
      const name = $(el).text().trim();

      const link = $(el).siblings(".see-menu-details").find("a").attr("href");

      return { name, link };
    })
    .get();

  return items;
}

// Step 2: Fetch calories from detail page
async function getCalories(link) {
  if (!link) return null;

  const url = link.startsWith("http") ? link : `https://dining.ucla.edu${link}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const calories = $(".single-calories").text().trim() || null;
  return calories;
}

// Step 3: Combine name + calories
async function scrapeMenu() {
  const menuItems = await getMenuItems();

  const results = await Promise.all(
    menuItems.map(async (item) => ({
      name: item.name,
      calories: await getCalories(item.link),
    }))
  );

  return results;
}

// AWS Lambda handler
exports.handler = async () => {
  try {
    const menuData = await scrapeMenu();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(menuData),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
