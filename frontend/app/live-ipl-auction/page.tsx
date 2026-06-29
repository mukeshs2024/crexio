import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Live IPL Auction - Real-Time Multiplayer Bidding Experience",
  description: "Experience the adrenaline rush of a Live IPL Auction. Compete against friends in real-time with live bidding, dynamic timers, and instant squad updates.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/live-ipl-auction",
  },
  openGraph: {
    title: "Live IPL Auction | Crexio",
    description: "Experience the adrenaline rush of a Live IPL Auction. Compete against friends in real-time with live bidding, dynamic timers, and instant squad updates.",
    url: "https://crexio-18.onrender.com/live-ipl-auction",
  }
};

export default function LiveIplAuctionPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      {/* Background */}
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
          Live IPL <span className="text-[#10B981]">Auction</span>
        </h1>

        <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl shadow-[rgba(16,185,129,0.1)]">
          <Image 
            src="/platform-screenshot.png" 
            alt="Live IPL Auction interface showing active timer and bidding war" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to the beating heart of our platform: the <strong>Live IPL Auction</strong> module. If you have ever watched the real television broadcasts of cricket mega auctions, you know that the tension is palpable. The rapid-fire bidding, the dramatic pauses, the sudden massive spikes in player valuations—it is a unique spectacle in the world of sports. We have engineered our platform from the ground up to capture that exact feeling and deliver it straight to your screen in real-time. This is not a slow, turn-based draft; this is a live, fast-paced bidding war where every second counts.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Real-Time Multiplayer Architecture</h2>
          <p>
            The magic of our Live IPL Auction lies in its technical foundation. We utilize robust WebSocket technology to ensure that the moment a participant clicks the "Bid" button, that action is instantaneously broadcasted to every other user in the room. There is no refreshing the page, no waiting for a server to poll for updates, and no annoying lag that could cost you a marquee player. When the countdown timer is ticking down from 3 to 1, you will feel the genuine pressure of deciding whether to raise the paddle one last time.
          </p>

          <p>
            When you <Link href="/create" className="text-[#10B981] hover:underline">create an auction room</Link>, you are essentially launching a private, real-time server for you and your friends. The host acts as the commissioner, but our automated system acts as the auctioneer, flawlessly handling the bid increments, the countdowns, and the final player assignments. This means everyone gets to focus entirely on their strategy rather than managing the logistics of the draft.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Dynamics of Live Bidding</h2>
          <p>
            Participating in a Live IPL Auction requires a different skill set than traditional fantasy drafts. You must be observant and reactive. As a player comes up for auction, their profile, complete with stats and role, is displayed prominently. The bidding starts at their base price. If two or more franchises are interested, a bidding war ensues. 
          </p>
          <p>
            This is where psychological warfare comes into play. You can employ tactics like "bid sniping" (waiting until the last possible second to place a bid, attempting to catch your opponents off guard) or "price driving" (bidding on a player you do not necessarily want, just to force a rival to spend more of their purse). However, price driving carries immense risk—if the rival suddenly backs out, you might be stuck paying a premium for a player you didn't plan for. For more in-depth discussion on these tactics, consult our <Link href="/ipl-auction-strategy" className="text-[#10B981] hover:underline">IPL Auction Strategy</Link> guide.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Managing the Chaos</h2>
          <p>
            Because the action moves so quickly, our interface is designed to present all critical information at a glance. Your dashboard will display your current remaining purse, the number of slots available in your squad, and a live feed of the recent bidding history. You can see exactly who bid what and when, allowing you to track the spending habits of your opponents. 
          </p>
          
          <p>
            If you realize an opponent is running low on funds, you can exploit that weakness in the later rounds when you have saved your budget. We highly recommend using a large screen or a tablet for the Live IPL Auction to ensure you can see all the data comfortably. But don't worry, the interface is fully responsive and completely functional on mobile devices as well, just in case you need to draft on the go.
          </p>

          <p>
            Once the live auction portion is completed, the pressure subsides, and you can transition smoothly into the <Link href="/ipl-team-builder" className="text-[#10B981] hover:underline">IPL Team Builder</Link> phase, where you construct your final lineup from the players you fought so hard to acquire. And remember, all of these features are available in our <Link href="/free-ipl-mock-auction" className="text-[#10B981] hover:underline">Free IPL Mock Auction</Link> tier.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                What happens if my internet disconnects during a live auction?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Our platform is designed to handle brief disconnections gracefully. If you drop out, your previous successful bids and current squad remain intact. As soon as you reconnect to the room URL, you will be instantly synced back to the current live state of the auction. However, you will not be able to place bids while disconnected.
              </div>
            </details>
            
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                How does the countdown timer work?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                When a player is brought up for auction, a timer begins (e.g., 15 seconds). Every time a new bid is placed, the timer resets to a specific duration (e.g., 10 seconds) to give other participants a fair chance to counter-bid. If the timer reaches zero, the player is sold to the highest bidder.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Can the room host pause the live auction?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Yes, the room host has administrative controls that allow them to pause the auction. This is useful for taking breaks, resolving disputes, or waiting for a disconnected player to rejoin before continuing with the next player lot.
              </div>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Experience the Thrill</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">Stop reading and start bidding. Gather your friends for the most intense and realistic live auction experience online.</p>
            <Link href="/create">
              <button className="px-10 py-5 bg-[#10B981] hover:bg-[#059669] hover:scale-105 active:scale-95 text-white font-bold rounded-xl transition-all duration-300 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                Start Live Auction
              </button>
            </Link>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Live IPL Auction | Crexio",
        "description": "Experience the adrenaline rush of a Live IPL Auction. Compete against friends in real-time with live bidding, dynamic timers, and instant squad updates.",
        "url": "https://crexio-18.onrender.com/live-ipl-auction"
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
          "name": "Live IPL Auction",
          "item": "https://crexio-18.onrender.com/live-ipl-auction"
        }]
      }} />
    </main>
  );
}
