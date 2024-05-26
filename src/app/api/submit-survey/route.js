import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { selectedValues } = await request.json();
    if (Object.keys(selectedValues).length !== 29) {
      throw new Error("Bütün Soruları Cevaplayın Lütfen");
    }
    const selected = Object.entries(selectedValues);

    const isStudent = selected[(0)[0]];
    const isCuisine = selected[(1)[0]];

    await sql.begin(async (sqlTransaction) => {
      const participantResult = await sqlTransaction`
        INSERT INTO Participants (is_student, into_cuisine) 
        VALUES (true, true) 
        RETURNING participant_id
      `;

      const participantId = participantResult.rows[0].participant_id;

      for (const [key, value] of selected) {
        await sqlTransaction`
          INSERT INTO Responses (participant_id, question_id, answer) 
          VALUES (${participantId}, ${parseInt(
          value.replace("question-", "")
        )}, ${key})
        `;
      }
    });
    return NextResponse.json(
      { message: "Katılımınız için teşekkürler" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
