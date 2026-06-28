import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Mock Auction Simulator",
  description: "Experience the ultimate IPL Mock Auction Simulator. Host private rooms, bid in real-time, build your squad, and evaluate your team against friends.",
  alternates: {
    canonical: "https://crexio.app/ipl-mock-auction",
  },
  openGraph: {
    title: "IPL Mock Auction Simulator | Crexio",
    description: "Experience the ultimate IPL Mock Auction Simulator. Host private rooms, bid in real-time, build your squad, and evaluate your team against friends.",
    url: "https://crexio.app/ipl-mock-auction",
  }
};

export default function IplMockAuctionPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      {/* Background */}
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
          IPL Mock Auction <span className="text-[#0066FF]">Simulator</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to the ultimate <strong>IPL Mock Auction Simulator</strong>. Whether you're a die-hard cricket fan or a fantasy sports enthusiast, Crexio offers the most realistic and engaging mock auction experience available online.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Why Choose Our IPL Mock Auction Simulator?</h2>
          <p>
            Hosting a mock auction shouldn't require complex spreadsheets or manual calculations. Our simulator handles everything from purse management to real-time bidding using ultra-low latency WebSocket connections.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Real-Time Multiplayer:</strong> Connect with up to 9 other friends in a private room.</li>
            <li><strong>Accurate Player Database:</strong> Bid on hundreds of real-world players with up-to-date stats and roles.</li>
            <li><strong>Automated Purse Tracking:</strong> Never worry about overspending; our engine calculates remaining budgets instantly.</li>
          </ul>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">How to Host Your IPL Mock Auction</h2>
          <p>
            Starting your own mock auction is incredibly simple:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Click on <strong>Create Auction</strong> from our homepage.</li>
            <li>Configure your starting purse (e.g., ₹100 Cr) and bidding timer (e.g., 15 seconds).</li>
            <li>Share the generated room code with your friends.</li>
            <li>Once everyone has claimed their favorite IPL franchise, click Start Auction!</li>
          </ol>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to start your IPL Mock Auction?</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#0066FF] hover:bg-[#3B82F6] text-white font-bold rounded-xl transition-colors tracking-widest uppercase">
                Create Room Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Mock Auction Simulator | Crexio",
        "description": "Experience the ultimate IPL Mock Auction Simulator. Host private rooms, bid in real-time, build your squad, and evaluate your team against friends.",
        "url": "https://crexio.app/ipl-mock-auction"
      }} />
      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://crexio.app/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "IPL Mock Auction Simulator",
          "item": "https://crexio.app/ipl-mock-auction"
        }]
      }} />
    </main>
  );
}
