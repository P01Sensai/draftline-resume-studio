import { Inter, Space_Grotesk, Courier_Prime, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const courierPrime = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-courier-prime", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

const SITE_URL = "https://draftline.example.com"; // TODO: replace with your real domain once deployed

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Draftline — Free Resume & Cover Letter Builder",
    template: "%s · Draftline",
  },
  description:
    "Build an ATS-friendly resume and cover letter side by side, with a live paper preview. Free, no sign-up, export instantly.",
  keywords: [
    "resume builder",
    "cover letter builder",
    "free resume builder",
    "ATS resume template",
    "resume maker",
  ],
  openGraph: {
    title: "Draftline — Free Resume & Cover Letter Builder",
    description:
      "Build an ATS-friendly resume and cover letter side by side, with a live paper preview. Free, no sign-up, export instantly.",
    url: SITE_URL,
    siteName: "Draftline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Draftline — Free Resume & Cover Letter Builder",
    description:
      "Build an ATS-friendly resume and cover letter side by side, with a live paper preview.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${courierPrime.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
