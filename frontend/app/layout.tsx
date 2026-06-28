import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FeedbackWidget from "@/components/FeedbackWidget";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://crexio-18.onrender.com'),
  title: {
    default: "IPL Mock Auction Simulator & Auction Analytics | Crexio",
    template: "%s | Crexio"
  },
  description: "Create and play realistic IPL Mock Auctions with friends. Build squads, analyze teams using AI-powered auction analytics, and experience the ultimate multiplayer IPL auction simulator.",
  keywords: ["IPL Mock Auction", "IPL Auction Simulator", "Cricket Mock Auction", "IPL Auction Analytics", "IPL Auction Game", "Online IPL Auction"],
  openGraph: {
    title: "Crexio - IPL Mock Auction Simulator",
    description: "Experience the ultimate multiplayer IPL mock auction.",
    url: "https://crexio-18.onrender.com",
    siteName: "Crexio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crexio - IPL Mock Auction Simulator",
    description: "Experience the ultimate multiplayer IPL mock auction.",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "Hdpd5f6Ay9LaCdX1GlkVysjjafBzvAbTCre-Uc2tGXY",
  },
};

export const viewport = {
  themeColor: "#0066FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stadium-bg text-white font-body antialiased">
        {children}
        <FeedbackWidget />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xe7rae08tr");
          `}
        </Script>
      </body>
    </html>
  );
}
