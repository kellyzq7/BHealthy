// index.js
const serverless = require("serverless-http");
const express = require("express");
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const MOCK_MODE = false; // toggle to false for real AI integration

// Function to call scraper Lambda
async function getMenuFromScraper() {
  try {
    const lambda = new LambdaClient({ region: "us-east-1" });
    const command = new InvokeCommand({
      FunctionName: "bhealthy-scraper", // Your scraper Lambda function name
      Payload: JSON.stringify({}),
    });

    const response = await lambda.send(command);
    const payload = JSON.parse(new TextDecoder().decode(response.Payload));

    if (payload.statusCode === 200) {
      return JSON.parse(payload.body);
    } else {
      throw new Error("Scraper failed");
    }
  } catch (error) {
    console.error("Error calling scraper:", error);
    // Return mock data if scraper fails
    return [
      { name: "Pizza Slice", calories: 300, protein: 12, carbs: 35, fat: 10 },
      { name: "Chicken Breast", calories: 250, protein: 30, carbs: 0, fat: 8 },
      { name: "Rice Bowl", calories: 200, protein: 4, carbs: 45, fat: 2 },
      { name: "Salad", calories: 150, protein: 8, carbs: 20, fat: 5 },
    ];
  }
}

// ------------------------
// Endpoint: POST /meal-planner
// ------------------------
app.post("/meal-planner", async (req, res) => {
  try {
    const { mealType, diningHall, calorieGoal } = req.body;

    // Get menu data from scraper
    const menuData = await getMenuFromScraper();

    // Convert scraper data to expected format
    const menu = menuData.map((item) => ({
      item: item.name,
      calories: parseInt(item.calories) || 0,
      protein: item.protein || 0,
      carbs: item.carbs || 0,
      fat: item.fat || 0,
    }));

    let responseBody;

    if (MOCK_MODE) {
      // ----------------------------
      // MOCK AI: pick highest-calorie items first
      // ----------------------------
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      const meals = [];

      const sortedMenu = menuData.sort((a, b) => b.calories - a.calories);

      for (const item of sortedMenu) {
        if (totalCalories + item.calories <= calories) {
          meals.push(item.item);
          totalCalories += item.calories;
          totalProtein += item.protein || 0;
          totalCarbs += item.carbs || 0;
          totalFat += item.fat || 0;
        }
        if (totalCalories >= calories) break;
      }

      responseBody = {
        meals,
        total_calories: totalCalories,
        total_protein: totalProtein,
        total_carbs: totalCarbs,
        total_fat: totalFat,
      };
    } else {
      // ----------------------------
      // Bedrock AI code
      // ----------------------------
      const client = new BedrockRuntimeClient({ region: "us-east-1" });
      const prompt = `
You are a meal planner for UCLA dining hall food.
Menu: ${JSON.stringify(menuData)}
Calorie goal: ${calories}

Prioritize hitting the calorie goal above all else.
Protein, carbs, and fat are optional.
Return JSON like this:
{
  "meals": ["item1", "item2", ...],
  "total_calories": number,
  "total_protein": number,
  "total_carbs": number,
  "total_fat": number
}
      `;
      const command = new InvokeModelCommand({
        modelId: "amazon.titan-text-express-v1",
        body: JSON.stringify({
          inputText: prompt,
          textGenerationConfig: {
            maxTokenCount: 300,
            temperature: 0.1
          }
        }),
        contentType: "application/json",
        accept: "application/json",
      });

      const response = await client.send(command);
      const decoded = new TextDecoder().decode(response.body);
      const aiResponse = JSON.parse(decoded);
      const content = aiResponse.results[0].outputText;
      
      // Extract JSON from AI response
      const jsonMatch = content.match(/\{[^}]+\}/s);
      if (jsonMatch) {
        responseBody = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('AI response invalid');
      }
    }

    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Wrap express app for serverless
module.exports.handler = serverless(app);
