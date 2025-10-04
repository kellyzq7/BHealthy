// Lambda handler - CommonJS
const MOCK_MODE = true; // toggle to false for real AI integration

// If you plan to use Bedrock later
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body);
    const { menu, goal } = body;
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

      // Sort menu by calories descending
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
      // Bedrock AI code here
      // ----------------------------
      const {
        BedrockRuntimeClient,
        InvokeModelCommand,
      } = require("@aws-sdk/client-bedrock-runtime");

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

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

// ---------------------------
// Local test runner
// ---------------------------
async function runLocalTest() {
  const fakeEvent = {
    body: JSON.stringify({
      menu: [
        {
          item: "Grilled Chicken",
          calories: 250,
          protein: 35,
          carbs: 0,
          fat: 10,
        },
        { item: "Rice", calories: 200, protein: 4, carbs: 45, fat: 1 },
        { item: "Broccoli", calories: 50, protein: 4, carbs: 10, fat: 0 },
        { item: "Pasta", calories: 300, protein: 10, carbs: 60, fat: 5 },
        { item: "Salad", calories: 100, protein: 2, carbs: 10, fat: 5 },
      ],
      goal: { calories: 600 },
    }),
  };

  const result = await exports.handler(fakeEvent);
  console.log("Lambda Output (raw):", result);
  console.log("Lambda Output (parsed body):", JSON.parse(result.body));
}

if (require.main === module) {
  runLocalTest().catch(console.error);
}
