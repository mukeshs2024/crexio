import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Auction Analytics",
  description: "Advanced IPL Auction Analytics and AI Team Ratings. Analyze your mock auction squad's batting, bowling, pace, and spin coverage with our proprietary engine.",
  alternates: {
    canonical: "https://crexio.app/auction-analytics",
  },
  openGraph: {
    title: "IPL Auction Analytics | Crexio",
    description: "Advanced IPL Auction Analytics and AI Team Ratings. Analyze your mock auction squad's batting, bowling, pace, and spin coverage with our proprietary engine.",
    url: "https://crexio.app/auction-analytics",
  }
};

export default function AuctionAnalyticsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#F59E0B] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
          IPL Auction <span className="text-[#F59E0B]">Team Analytics</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            An auction isn't won just by spending money; it's won by building a cohesive team. Crexio's <strong>IPL Auction Analytics</strong> engine provides deep, AI-driven insights into your drafted squad to determine who truly won the auction.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Comprehensive AI Rankings</h2>
          <p>
            When all teams are locked in, our analytics engine evaluates every squad based on real-world career data, recent T20 form, and role composition. We generate an objective <strong>Overall Team Rating</strong> out of 100, ranking every franchise in your room from first to worst.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Deep Dive Categories</h2>
          <p>
            Our analytics don't stop at an overall score. We break down your team into critical cricketing metrics:
          </p>
          <ul className="list-none space-y-4">
            <li className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
              <strong className="text-white text-xl block mb-2 text-[#0066FF]">Batting Analysis</strong>
              Evaluates the depth of your batting lineup, top-order firepower, and finishing ability.
            </li>
            <li className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
              <strong className="text-white text-xl block mb-2 text-[#10B981]">Bowling Analysis</strong>
              Scores your bowling attack's overall potency, economy rates, and wicket-taking consistency.
            </li>
            <li className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
              <strong className="text-white text-xl block mb-2 text-[#F59E0B]">Pace & Spin Coverage</strong>
              Checks if you have the right balance of express pace, swing bowlers, and mystery spinners to handle varied pitch conditions.
            </li>
          </ul>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Visualizing Success</h2>
          <p>
            The analytics dashboard visualizes your team's strengths and highlights glaring weaknesses. Did you forget to draft a frontline spinner? Is your middle order lacking experience? The AI engine will let you know. Use these insights to refine your strategy for your next mock auction!
          </p>

          <div className="mt-16 p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Want to test your squad-building skills?</h3>
            <Link href="/create">
              <button className="px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl transition-colors tracking-widest uppercase">
                Create Room Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Auction Analytics | Crexio",
        "description": "Advanced IPL Auction Analytics and AI Team Ratings. Analyze your mock auction squad's batting, bowling, pace, and spin coverage with our proprietary engine.",
        "url": "https://crexio.app/auction-analytics"
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
          "name": "IPL Auction Analytics",
          "item": "https://crexio.app/auction-analytics"
        }]
      }} />
    </main>
  );
}
