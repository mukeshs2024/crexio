import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Play the Ultimate IPL Auction Game Online - Multiplayer Cricket Draft",
  description: "Experience the thrill of a real mega auction with our multiplayer IPL Auction Game. No signup required. Bid against friends in real-time.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/ipl-auction-game",
  },
  openGraph: {
    title: "IPL Auction Game | Multiplayer Cricket Draft",
    description: "Play the most realistic multiplayer IPL Auction Game online. No signup required.",
    url: "https://crexio-18.onrender.com/ipl-auction-game",
  }
};

export default function IplAuctionGamePage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#0066FF] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#0066FF] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          IPL Auction <span className="text-[#0066FF]">Game</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Looking to play the ultimate <strong>IPL Auction Game</strong> online? You have found the right place. Our platform is a multiplayer cricket draft that simulates the intensity of a real-life mega auction. Best of all? There is <strong>no signup required</strong> to get started. You can host a room in seconds and invite your friends.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">How to Play the IPL Auction Game</h2>
          <p>
            This multiplayer cricket game is designed to be frictionless. Simply click "Create Auction", generate your room code, and share it. Everyone joins instantly on their mobile or desktop devices.
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Host in seconds:</strong> Zero setup required. We handle the player database and purse calculations.</li>
            <li><strong>AI-based Player Values:</strong> Base prices and categories are automatically updated based on real-world performance.</li>
            <li><strong>Real-time Multiplayer:</strong> Experience live bidding wars with lag-free websocket technology.</li>
          </ul>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Play?</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#0066FF] hover:bg-[#3B82F6] text-white font-bold rounded-xl transition-colors tracking-widest uppercase shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                Start Game Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Auction Game | Multiplayer Cricket Draft",
        "description": "Play the most realistic multiplayer IPL Auction Game online. No signup required.",
        "url": "https://crexio-18.onrender.com/ipl-auction-game"
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
          "name": "IPL Auction Game",
          "item": "https://crexio-18.onrender.com/ipl-auction-game"
        }]
      }} />
    </main>
  );
}
