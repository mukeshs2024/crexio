import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Play Fantasy Auction Online - Cricket Draft Simulator",
  description: "Experience the ultimate Fantasy Auction simulator. Draft your fantasy cricket team with friends in a real-time multiplayer bidding environment.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/fantasy-auction",
  },
  openGraph: {
    title: "Fantasy Auction | Cricket Draft Simulator",
    description: "Draft your fantasy cricket team with friends in a real-time multiplayer bidding environment.",
    url: "https://crexio-18.onrender.com/fantasy-auction",
  }
};

export default function FantasyAuctionPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#EC4899] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#EC4899] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          Fantasy <span className="text-[#EC4899]">Auction</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Tired of the standard snake drafts for your fantasy leagues? Elevate your season with a competitive <strong>Fantasy Auction</strong>. Our platform serves as the premier fantasy cricket draft simulator, putting you and your friends in the hot seat of franchise management.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Why Run a Fantasy Cricket Draft?</h2>
          <p>
            A traditional draft limits your choices. In a fantasy auction, every player is available to every manager—if you are willing to pay the price. Manage your budget carefully to outbid your league rivals for top-tier talent.
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Frictionless Setup:</strong> No signup required to start playing. Jump straight into the action.</li>
            <li><strong>Live Multiplayer Bidding:</strong> Synchronized timers and real-time updates ensure an authentic draft simulator experience.</li>
            <li><strong>Strategic Depth:</strong> Balance your spending between expensive star players and hidden uncapped gems.</li>
          </ul>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Launch Your Fantasy Draft</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold rounded-xl transition-colors tracking-widest uppercase shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                Create Fantasy Auction
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Fantasy Auction | Cricket Draft Simulator",
        "description": "Draft your fantasy cricket team with friends in a real-time multiplayer bidding environment.",
        "url": "https://crexio-18.onrender.com/fantasy-auction"
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
          "name": "Fantasy Auction",
          "item": "https://crexio-18.onrender.com/fantasy-auction"
        }]
      }} />
    </main>
  );
}
