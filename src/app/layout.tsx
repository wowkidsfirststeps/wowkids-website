import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WowKids First Steps | Preschool in Medipally, Hyderabad",
  description:
    "WowKids First Steps offers Playgroup, Pre-Primary, and Day-Care programs in Medipally, Hyderabad. Nurturing young minds with love, care, and excellence.",
  keywords: [
    "preschool",
    "playgroup",
    "daycare",
    "Hyderabad",
    "Medipally",
    "early childhood education",
    "WowKids",
  ],
  openGraph: {
    title: "WowKids First Steps | Preschool in Medipally, Hyderabad",
    description:
      "Nurturing young minds with love, care, and excellence in early childhood education.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
