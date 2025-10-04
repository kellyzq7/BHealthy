import { handler } from "./index.mjs";

async function test() {
  const result = await handler();
  const data = JSON.parse(result.body);

  console.log("Menu items fetched:", data.length);
  console.log(data); 
}

test();
