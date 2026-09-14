import DashboardGrid from "@/components/dashboard/DashboardGrid";

export const metadata = {
  title: "Draftline Dashboard — Resume & Cover Letter Builder",
  description:
    "Manage and build ATS-friendly resumes and cover letters side by side.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="min-h-screen w-full relative">
      <DashboardGrid />
    </main>
  );
}
