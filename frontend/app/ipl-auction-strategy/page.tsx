import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Auction Strategy - Advanced Tips and Tactics to Win",
  description: "Master the art of the draft with our comprehensive IPL Auction Strategy guide. Learn about purse management, player valuation, and outsmarting your opponents.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/ipl-auction-strategy",
  },
  openGraph: {
    title: "IPL Auction Strategy | Crexio",
    description: "Master the art of the draft with our comprehensive IPL Auction Strategy guide. Learn about purse management, player valuation, and outsmarting opponents.",
    url: "https://crexio-18.onrender.com/ipl-auction-strategy",
  }
};

export default function IplAuctionStrategyPage() {
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
          IPL Auction <span className="text-[#10B981]">Strategy</span>
        </h1>

        <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl shadow-[rgba(16,185,129,0.1)]">
          <Image 
            src="/platform-screenshot.png" 
            alt="IPL Auction Strategy analytics dashboard showing purse management" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to the masterclass. Whether you are using our <Link href="/ipl-auction-simulator" className="text-[#10B981] hover:underline">IPL Auction Simulator</Link> to practice for a fantasy league draft or competing in a high-stakes <Link href="/live-ipl-auction" className="text-[#10B981] hover:underline">Live IPL Auction</Link> event with your friends, having a sound <strong>IPL Auction Strategy</strong> is the difference between building a dynasty and finishing at the bottom of the table. 
          </p>
          
          <p>
            In the chaos of a live draft, emotions run high. It is incredibly easy to get caught up in a bidding war for a player you like, only to realize you have blown half your budget on a single individual. This guide will break down the advanced tactics, mathematical principles, and psychological tricks you need to dominate the auction table.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Core Pillar: Purse Management</h2>
          <p>
            The most fundamental aspect of any auction strategy is purse management. You cannot buy every player you want. You must assign intrinsic values to players before the auction even begins. A common and highly effective tactic is the "Tiered Budget Allocation" system.
          </p>
          
          <p>
            Divide your total purse (e.g., 100 Crores) into buckets based on player roles:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Marquee Players (2 slots):</strong> 35% of total budget. These are your guaranteed match-winners and captaincy options.</li>
            <li><strong>Core Squad (6 slots):</strong> 40% of total budget. Reliable domestic players and overseas specialists.</li>
            <li><strong>Utility and Bench (7-10 slots):</strong> 25% of total budget. Base-price steals, emerging talents, and backup options.</li>
          </ul>
          <p>
            If you overspend on a Marquee player, you must immediately adjust your budget for the other tiers. Strict discipline here prevents the catastrophic scenario of having to fill your last five slots with unsold, base-price players who will never make it into your <Link href="/ipl-team-builder" className="text-[#10B981] hover:underline">IPL Team Builder</Link> playing XI.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Psychological Warfare: Price Driving and Bid Sniping</h2>
          <p>
            An auction is not played in a vacuum; you are playing the other managers as much as you are playing the board. If you know an opponent is a massive fan of a specific franchise or player, you can artificially inflate the price. By placing bids on a player you don't actually want, you force your opponent to spend more of their purse to secure them. This is known as "price driving."
          </p>
          
          <p>
            <strong>Warning:</strong> Price driving is a double-edged sword. If you bid 10 Crores on a player purely to drive up the price, and your opponent suddenly folds, you are now stuck paying 10 Crores for a player that does not fit your strategy. Only price drive up to a value where you would still be comfortable owning the player.
          </p>

          <p>
            Conversely, "bid sniping" involves waiting until the countdown timer is at the absolute last second before placing your bid. This denies your opponents the time to think rationally about counter-bidding, often leading to them folding under pressure. Our platform's real-time websockets make this tactic viable and incredibly thrilling.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The "Wait and Watch" Approach</h2>
          <p>
            In the early rounds of an auction, the most famous players are usually brought out. Prices often skyrocket as every franchise has a full purse and the desire to land a superstar. A highly effective, albeit contrarian, strategy is to sit on your hands during the first hour. 
          </p>
          
          <p>
            Let your opponents exhaust 60-70% of their budgets fighting over the top 10 players. Once their purses are depleted, you become the most powerful franchise in the room. You can then systematically acquire excellent tier-two and tier-three players at bargain prices because nobody else has the funds to outbid you. This results in a deeply balanced squad, which often performs better over a long tournament than a top-heavy team.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Focusing on Scarcity: The All-Rounder Premium</h2>
          <p>
            When evaluating players, you must consider scarcity. There are dozens of capable top-order batsmen in the world. If you miss out on one, there will be another available soon. However, genuine fast-bowling all-rounders—players who can bowl four overs of pace and bat in the top six—are incredibly rare. 
          </p>
          
          <p>
            Because of this scarcity, you must be willing to pay a premium for these players. Securing a top-tier all-rounder provides immense flexibility when you transition to the <Link href="/ipl-team-builder" className="text-[#10B981] hover:underline">IPL Team Builder</Link> phase, allowing you to easily balance your overseas limits and bowling options. Identify the scarce roles early and prioritize them in your budget.
          </p>

          <p>
            The best way to refine these strategies is through practice. We highly recommend spinning up a <Link href="/free-ipl-mock-auction" className="text-[#10B981] hover:underline">Free IPL Mock Auction</Link> room and testing different approaches. Try the aggressive "Stars and Scrubs" method one night, and the conservative "Wait and Watch" method the next. Find the strategy that best suits your managerial style.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                What is the "Right to Match" (RTM) card, and should I use it?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                The RTM card allows a franchise to match the final bid on a player they previously owned, bringing them back to the squad. Strategically, you should only use an RTM if the final auction price is lower or equal to the intrinsic value you pre-assigned to that player. Do not use an RTM purely out of loyalty if the price was driven too high.
              </div>
            </details>
            
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                How many fast bowlers should I aim to buy?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                You should aim to have a minimum of 5-6 fast bowlers in your overall squad. Injuries and rotational needs are common in fast bowling. A good mix is two overseas marquee pacers and 3-4 reliable domestic options.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Is it a bad idea to spend 40% of my purse on one player?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Generally, yes. While having a superstar is great, spending nearly half your budget on one player severely limits your ability to build a balanced squad. One player cannot win a tournament alone. If you do this, you must hit on multiple "steals" at base price to salvage your team.
              </div>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Put Your Strategy to the Test</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">You have read the theory, now it is time for practice. Jump into an auction room and see if you have what it takes to outsmart the competition.</p>
            <Link href="/create">
              <button className="px-10 py-5 bg-[#10B981] hover:bg-[#059669] hover:scale-105 active:scale-95 text-white font-bold rounded-xl transition-all duration-300 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                Test Your Strategy
              </button>
            </Link>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Auction Strategy | Crexio",
        "description": "Master the art of the draft with our comprehensive IPL Auction Strategy guide. Learn about purse management, player valuation, and outsmarting your opponents.",
        "url": "https://crexio-18.onrender.com/ipl-auction-strategy"
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
          "name": "IPL Auction Strategy",
          "item": "https://crexio-18.onrender.com/ipl-auction-strategy"
        }]
      }} />
    </main>
  );
}
