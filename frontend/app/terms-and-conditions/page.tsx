import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Terms and Conditions - Crexio",
  description: "Terms and Conditions for using Crexio IPL Mock Auction Simulator.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/terms-and-conditions",
  }
};

export default function TermsAndConditionsPage() {
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
          Terms and <span className="text-[#10B981]">Conditions</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

          <p>
            Welcome to Crexio. These Terms and Conditions govern your use of our website and the IPL mock auction simulation services we provide. By accessing or using our website, you agree to be bound by these Terms.
          </p>

          <h2>1. Intellectual Property</h2>
          <p>
            Crexio is an independent platform and is in no way affiliated, associated, authorized, endorsed by, or in any way officially connected with the Board of Control for Cricket in India (BCCI), the Indian Premier League (IPL), or any of its teams. All product and company names, logos, and trademarks are property of their respective owners.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            Our mock auction platform is provided for entertainment and educational purposes only. It is entirely free-to-play. You agree not to use the platform for any illegal or unauthorized purpose, including but not limited to gambling, real-money betting, or distributing malicious software.
          </p>

          <h2>3. User Conduct</h2>
          <p>
            When creating or joining a mock auction room, you agree to conduct yourself respectfully. We reserve the right to terminate access to any user who engages in abusive behavior, spamming, or attempts to exploit bugs in the real-time bidding engine.
          </p>

          <h2>4. Advertisements</h2>
          <p>
            Crexio uses third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The service is provided "AS IS" and "AS AVAILABLE". We do not warrant that the service will be uninterrupted, completely secure, or error-free. We are not responsible for lost auction data due to network disconnects or server issues.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Crexio, nor its creators, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:vprlks20@gmail.com" className="text-[#10B981] hover:underline">vprlks20@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
