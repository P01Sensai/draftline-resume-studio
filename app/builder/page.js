import BuilderClient from "@/components/builder/BuilderClient";

export const metadata = {
  title: "Resume & Cover Letter Builder",
  description:
    "Write your resume and cover letter with a live paper preview. Switch templates, download as PDF — free, no sign-up.",
  alternates: { canonical: "/builder" },
  robots: { index: true, follow: true },
};

export default function BuilderPage() {
  return <BuilderClient />;
}
