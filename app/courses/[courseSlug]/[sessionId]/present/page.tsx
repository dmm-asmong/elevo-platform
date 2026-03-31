import { notFound } from "next/navigation";
import { courses } from "@/content/courses.config";
import { getSessionList, getSessionContent } from "@/lib/content";
import PresentationMode from "@/components/presentation/PresentationMode";

interface Props {
  params: Promise<{ courseSlug: string; sessionId: string }>;
}

export default async function PresentPage({ params }: Props) {
  const { courseSlug, sessionId } = await params;
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course || course.status !== "active") notFound();

  const sessions = getSessionList(courseSlug);
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) notFound();

  const content = getSessionContent(courseSlug, sessionId);
  if (!content.slideUrl) notFound();

  const slideUrl = content.slideUrl;
  const backUrl = `/courses/${courseSlug}/${sessionId}`;

  return (
    <PresentationMode
      slideUrl={slideUrl}
      sessionTitle={`${session.sessionNumber}회차: ${session.title}`}
      backUrl={backUrl}
    />
  );
}
