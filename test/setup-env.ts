import * as dotenv from "dotenv";

console.error = jest.fn();
console.log = jest.fn();

dotenv.config({ path: ".env.e2e" });
