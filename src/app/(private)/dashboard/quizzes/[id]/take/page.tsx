import { QuizTakeWrapper } from "@/components/quiz-take/quiz-take-wrapper";

export default async function TakeExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  return <QuizTakeWrapper quizId={p.id} />;
}
