import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const result = await sql`SELECT * FROM Questions;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
