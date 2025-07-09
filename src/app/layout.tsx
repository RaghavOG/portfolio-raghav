import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Raghav Singla | Portfolio",
  description: "AI & Fullstack Developer Portfolio – Explore projects, experience, and contact information.",
  metadataBase: new URL("https://www.raghavsingla.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Raghav Singla | Portfolio",
    description: "Explore Raghav's work as a Fullstack + AI Developer.",
    url: "https://www.raghavsingla.tech",
    siteName: "Raghav Singla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Singla | Portfolio",
    description: "Explore Raghav's work as a Fullstack + AI Developer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, spaceGrotesk.variable)}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="nDniD2KBqFE_i9t4cyWhp54YOSRZot-KFxST6V9nggo" />
        <link rel="canonical" href="https://www.raghavsingla.tech" />
        <link rel="icon" href="/favicon.ico" />

        {/* ✅ JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Raghav Singla",
            "url": "https://www.raghavsingla.tech",
            "sameAs": [
              "https://github.com/raghavog",
              "https://www.linkedin.com/in/raghavog"
            ],
            "jobTitle": "Fullstack & AI Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Self-Employed"
            }
          })
        }} />
      </head>
      <body className="min-h-screen bg-darkBackground font-sans antialiased text-darkForeground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
