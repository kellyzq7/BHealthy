// index.js
const serverless = require("serverless-http");
const express = require("express");
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const app = express();
app.use(express.json());

const MOCK_MODE = true; // toggle to false for real AI integration

// ------------------------
// Endpoint: POST /meal-planner
// ------------------------
app.post("/meal-planner", async (req, res) => {
  try {
    const { menu, goal } = req.body;
    const calorieGoal = goal.calories;

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

      const sortedMenu = menu.sort((a, b) => b.calories - a.calories);

      for (const item of sortedMenu) {
        if (totalCalories + item.calories <= calorieGoal) {
          meals.push(item.item);
          totalCalories += item.calories;
          totalProtein += item.protein || 0;
          totalCarbs += item.carbs || 0;
          totalFat += item.fat || 0;
        }
        if (totalCalories >= calorieGoal) break;
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
Menu: ${JSON.stringify(menu)}
Calorie goal: ${calorieGoal}

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
        modelId: "anthropic.claude-v2",
        body: JSON.stringify({ prompt, max_tokens_to_sample: 300 }),
        contentType: "application/json",
        accept: "application/json",
      });

      const response = await client.send(command);
      responseBody = JSON.parse(new TextDecoder().decode(response.body));
    }

    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Wrap express app for serverless
module.exports.handler = serverless(app);
