import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Mega Auction Simulator - Practice with Official Rules",
  description: "Experience the highly anticipated IPL Mega Auction. Simulate the draft with accurate mega auction rules, purse limits, and retention mechanics.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/ipl-mega-auction",
  },
  openGraph: {
    title: "IPL Mega Auction Simulator",
    description: "Simulate the draft with accurate mega auction rules, purse limits, and retention mechanics.",
    url: "https://crexio-18.onrender.com/ipl-mega-auction",
  }
};

export default function IplMegaAuctionPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#EAB308] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#EAB308] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          IPL Mega <span className="text-[#EAB308]">Auction</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            The <strong>IPL Mega Auction</strong> is the most strategic event in franchise cricket, where teams rebuild their squads from scratch. Our simulator allows you to practice for the upcoming mega auction using authentic purse limits and updated player lists.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Master the Mega Auction Rules</h2>
          <p>
            An IPL Mega Auction differs significantly from mini-auctions. With larger purses and hundreds of available players—including top-tier capped and uncapped talent—the dynamics completely change. Use our platform to test your <strong>mega auction rules</strong> strategy. 
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>No Signup Required:</strong> Instantly launch an IPL 2026 mega auction simulator room and invite competitors.</li>
            <li><strong>Dynamic Purse Limits:</strong> Experience the tension of managing your budget as the auction progresses.</li>
            <li><strong>Right to Match (RTM) Simulation:</strong> Factor in retentions and RTM cards into your bidding strategies.</li>
          </ul>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Mega Draft</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl transition-colors tracking-widest uppercase shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Create Mega Auction
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Mega Auction Simulator",
        "description": "Simulate the draft with accurate mega auction rules, purse limits, and retention mechanics.",
        "url": "https://crexio-18.onrender.com/ipl-mega-auction"
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
          "name": "IPL Mega Auction",
          "item": "https://crexio-18.onrender.com/ipl-mega-auction"
        }]
      }} />
    </main>
  );
}
