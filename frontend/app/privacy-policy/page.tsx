import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Privacy Policy - Crexio",
  description: "Privacy Policy for Crexio. Learn how we collect, use, and protect your data.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/privacy-policy",
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#10B981] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#10B981] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          Privacy <span className="text-[#10B981]">Policy</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

          <p>
            Welcome to Crexio. We value your privacy and are committed to protecting your personal data. This Privacy Policy informs you about how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use our IPL mock auction platform, we may collect the following types of information:
          </p>
          <ul>
            <li><strong>Usage Data:</strong> Information on how you interact with our website, such as page visits, auction room interactions, time spent on the site, and diagnostic data.</li>
            <li><strong>Device Data:</strong> Details about the device you use to access the site, including IP address, browser type, and operating system.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies (including Google AdSense tracking) to enhance your experience, analyze traffic, and serve targeted advertisements.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the data we collect for various purposes, including:
          </p>
          <ul>
            <li>To provide, operate, and maintain our IPL mock auction simulation services.</li>
            <li>To improve the user experience and analyze site traffic (e.g., via Google Analytics).</li>
            <li>To serve relevant advertisements through third-party vendors like Google AdSense.</li>
            <li>To communicate with you if you reach out to us for support.</li>
          </ul>

          <h2>3. Third-Party Services and Advertisements</h2>
          <p>
            Our website uses third-party services that may collect information used to identify you. 
          </p>
          <p>
            We use Google AdSense to publish ads on our site. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to your sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline">Ads Settings</a>.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. However, please remember that no method of transmission over the internet, or method of electronic storage, is 100% secure.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:vprlks20@gmail.com" className="text-[#10B981] hover:underline">vprlks20@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
