import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { selectedValues } = await request.json();
    const selected = Object.entries(selectedValues);
    console.log(selected);
    if (selected.length < 28) {
      throw new Error("Bütün soruları cevaplayın lütfen.");
    }

    const number = Number(selected[0][1]);

    const participantResult = await sql`
      INSERT INTO Participants (is_student, into_cuisine, "Kaçıncı sınıfta okuyorsun?") 
      VALUES ('Evet', 'Evet', ${number}) 
      RETURNING participant_id`;

    const participantId = participantResult.rows[0].participant_id;
    for (const [questionId, answer] of selected.slice(2)) {
      const questionIdNumber = parseInt(questionId.replace("question-", ""));
      if (isNaN(questionIdNumber)) {
        throw new Error(`Invalid questionId: ${questionId}`);
      }
      console.log(questionIdNumber, 11);
      await sql`
        INSERT INTO responses (participant_id, question_id, answer_choice) 
        VALUES (${participantId}, ${questionIdNumber}, ${answer})
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
