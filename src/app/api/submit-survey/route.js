import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { selectedValues } = await request.json();
    const selected = Object.entries(selectedValues);

    const isStudent = selected[(0)[0]];
    const isCuisine = selected[(1)[0]];

    const participantResult = await sql`
      INSERT INTO Participants (is_student, into_cuisine) 
      VALUES (${isStudent}, ${isCuisine}}]) 
      RETURNING participant_id`;

    const participantId = participantResult[0].participant_id;

    console.log(selected);
    for (const [answer, questionId] of selected) {
      await sql`
        INSERT INTO responses (participant_id, question_id, answer) 
        VALUES (${participantId}, ${parseInt(
        questionId.replace("question-", "")
      )}, ${answer})
        `;
    }

    return NextResponse.json(
      { message: "Katılımınız için teşekkürler" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
