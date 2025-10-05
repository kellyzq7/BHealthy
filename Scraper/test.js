import { handler } from "./index.mjs";

async function test() {
  try {
    const result = await handler();
    const data = JSON.parse(result.body);

    console.log("Menu items fetched:", data.length);
    console.log(data);
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

test();
