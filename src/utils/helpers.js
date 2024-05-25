import { sql } from "@vercel/postgres";

export async function getQuestions() {
  try {
    const result = await sql`SELECT * FROM Questions;`;
    return result;
  } catch (error) {
    return console.log(error);
  }
}
