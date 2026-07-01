import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Mock IPL Auction - Play Online With Friends",
  description: "Join the best Mock IPL Auction online platform. No signup required to host your own real-time multiplayer mock auction room.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/mock-ipl-auction",
  },
  openGraph: {
    title: "Mock IPL Auction | Crexio",
    description: "Join the best Mock IPL Auction online platform. No signup required.",
    url: "https://crexio-18.onrender.com/mock-ipl-auction",
  }
};

export default function MockIplAuctionPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#8B5CF6] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#8B5CF6] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          Mock IPL <span className="text-[#8B5CF6]">Auction</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to the ultimate platform to host your very own <strong>Mock IPL Auction</strong>. Whether you're preparing for a tournament or just looking for a fun night with cricket-loving friends, our real-time simulator offers the most engaging experience available online.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Fastest Way to Host a Mock IPL Auction</h2>
          <p>
            What sets us apart from competitors? <strong>No signup required.</strong> We believe getting into the game should be frictionless. You can generate a unique room code in seconds and start bidding immediately.
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Live Multiplayer Updates:</strong> Watch as friends bid on top players in real-time.</li>
            <li><strong>Accurate Player Database:</strong> Our system features hundreds of capped and uncapped players, fully organized by roles and base prices.</li>
            <li><strong>Automated Purse Tracking:</strong> Let our AI handle the math while you focus on building your dream squad.</li>
          </ul>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Mock Draft</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-xl transition-colors tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Create Mock Auction
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Mock IPL Auction | Crexio",
        "description": "Join the best Mock IPL Auction online platform. No signup required.",
        "url": "https://crexio-18.onrender.com/mock-ipl-auction"
      }} />
      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://crexio-18.onrender.com/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Mock IPL Auction",
          "item": "https://crexio-18.onrender.com/mock-ipl-auction"
        }]
      }} />
    </main>
  );
}
