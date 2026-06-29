import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "About Us - Crexio",
  description: "Learn more about Crexio, the ultimate IPL Mock Auction Simulator.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/about",
  }
};

export default function AboutPage() {
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
          About <span className="text-[#10B981]">Us</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to <strong>Crexio</strong>, the premier destination for cricket enthusiasts looking to experience the thrill of an IPL mock auction. 
          </p>
          <p>
            Our platform was built by passionate cricket fans who wanted to bring the high-stakes environment of franchise drafting directly to your screen. Whether you are a casual fan preparing for your fantasy league or an aspiring analyst looking to test your strategies, Crexio provides an authentic, real-time multiplayer simulation that mirrors the intensity of a real mega auction.
          </p>
          <p>
            We are dedicated to providing a fair, transparent, and completely free-to-play environment. There are no paywalls for our core auction features. Our mission is to foster a vibrant community of cricket lovers who can come together, debate player valuations, and enjoy the competitive spirit of the game.
          </p>
          <p>
            Have a question, feedback, or a feature request? We would love to hear from you. Feel free to contact us at <a href="mailto:vprlks20@gmail.com" className="text-[#10B981] hover:underline">vprlks20@gmail.com</a>.
          </p>
        </div>
      </div>
      
      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Crexio",
        "description": "Learn more about Crexio, the ultimate IPL Mock Auction Simulator.",
        "url": "https://crexio-18.onrender.com/about"
      }} />
    </main>
  );
}
