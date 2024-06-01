import { sql } from "@vercel/postgres";

export async function getQuestions() {
  try {
    const result = await sql`SELECT * FROM Questions;`;
    return result;
  } catch (error) {
    return console.log(error);
  }
}

export async function getResults() {
  try {
    const responses = await sql`
    SELECT * FROM responses`;
    return responses.rows;
  } catch (error) {
    console.log(error);
  }
}
