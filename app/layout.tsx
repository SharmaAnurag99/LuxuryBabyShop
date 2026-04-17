import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyNest - Luxury Baby Products",
  description: "Premium quality products for your precious little one.",
  openGraph: {
    title: "TinyNest - Luxury Baby Products",
    description: "Premium quality products for your precious little one.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
