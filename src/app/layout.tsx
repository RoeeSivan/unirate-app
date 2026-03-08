import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.uni-rate.com'),
  title: "Runi Course Ratings",
  description: "Rate and review courses at Reichman University",
  viewport: 'width=device-width,initial-scale=1',
  openGraph: {
    title: "Runi Course Ratings",
    description: "Rate and review courses at Reichman University",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <Navbar session={session ? { email: session.email, name: session.name } : null} />
          <main className="container">
            {children}
          </main>
        </LanguageProvider>

        <Analytics />

      </body>
    </html>
  );
}