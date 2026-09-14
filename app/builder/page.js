import WorkspaceLayout from "@/components/builder/WorkspaceLayout";

export const metadata = {
  title: "Builder — Draftline",
  description: "Edit your resume and cover letter.",
  robots: { index: false, follow: false },
};

export default function BuilderPage() {
  return <WorkspaceLayout />;
}
