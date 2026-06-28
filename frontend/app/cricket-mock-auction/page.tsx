import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Cricket Mock Auction Platform",
  description: "The ultimate Cricket Mock Auction Platform. Build your dream cricket team, manage your purse, and outbid opponents in our real-time simulator.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/cricket-mock-auction",
  },
  openGraph: {
    title: "Cricket Mock Auction Platform | Crexio",
    description: "The ultimate Cricket Mock Auction Platform. Build your dream cricket team, manage your purse, and outbid opponents in our real-time simulator.",
    url: "https://crexio-18.onrender.com/cricket-mock-auction",
  }
};

export default function CricketMockAuctionPage() {
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
          Cricket Mock Auction <span className="text-[#10B981]">Platform</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Dive into the strategic world of franchise cricket with Crexio's premium <strong>Cricket Mock Auction Platform</strong>. Experience the pressure of the auction gavel and prove your team-building skills against friends from around the world.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Best Cricket Mock Auction Experience</h2>
          <p>
            Whether you are preparing for a fantasy draft or just want to have fun simulating a mega auction, our platform provides all the tools you need:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dynamic Player Pools:</strong> Access to a vast database of international and domestic cricket stars.</li>
            <li><strong>Seamless Multiplayer:</strong> Invite up to 9 friends via a simple link and compete in real-time.</li>
            <li><strong>Fair Bidding Mechanics:</strong> A robust timer and automated increment system ensures a fair and exciting auction.</li>
          </ul>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Strategy is Everything</h2>
          <p>
            In a Cricket Mock Auction, money management is just as important as player knowledge. Will you spend big on a marquee superstar, or spread your budget to build a balanced squad of reliable performers? Our platform forces you to make tough decisions on the fly, just like real franchise owners.
          </p>
          
          <p>
            Once the auction ends, use our Team Builder to slot your players into the perfect Playing XI, complete with a Captain and Wicket-Keeper.
          </p>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Start your Cricket Mock Auction journey!</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-xl transition-colors tracking-widest uppercase">
                Create Room Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cricket Mock Auction Platform | Crexio",
        "description": "The ultimate Cricket Mock Auction Platform. Build your dream cricket team, manage your purse, and outbid opponents in our real-time simulator.",
        "url": "https://crexio-18.onrender.com/cricket-mock-auction"
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
          "name": "Cricket Mock Auction Platform",
          "item": "https://crexio-18.onrender.com/cricket-mock-auction"
        }]
      }} />
    </main>
  );
}
