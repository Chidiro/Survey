import { getQuestions } from "@/utils/helpers";
import SurveyForm from "@/components/SurveyForm";

export default async function Home() {
  const data = await getQuestions();
  const questions = data.rows.map((e) => e.question_text);
  return (
    <main className="w-full flex justify-center bg-slate-200 h-max">
      <SurveyForm questions={questions} className="w-10/12" />
    </main>
  );
}
