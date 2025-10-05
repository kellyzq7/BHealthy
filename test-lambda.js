// Test Lambda function directly
const fetch = require('node-fetch');

async function testLambda() {
  try {
    const response = await fetch('https://looo62rg3afi7sqnsa7wnuzglq0nrtlo.lambda-url.us-east-1.on.aws/meal-planner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mealType: 'Breakfast',
        diningHall: 'De Neve Dining',
        calorieGoal: '600'
      })
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLambda();