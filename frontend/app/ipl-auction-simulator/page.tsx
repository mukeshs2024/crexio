import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Auction Simulator - Realistic Fantasy Draft Experience",
  description: "Experience the ultimate IPL Auction Simulator. Draft players, manage your virtual purse, and test your franchise building skills against real opponents.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/ipl-auction-simulator",
  },
  openGraph: {
    title: "IPL Auction Simulator | Crexio",
    description: "Experience the ultimate IPL Auction Simulator. Draft players, manage your virtual purse, and test your franchise building skills.",
    url: "https://crexio-18.onrender.com/ipl-auction-simulator",
  }
};

export default function IplAuctionSimulatorPage() {
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
          IPL Auction <span className="text-[#10B981]">Simulator</span>
        </h1>

        <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl shadow-[rgba(16,185,129,0.1)]">
          <Image 
            src="/platform-screenshot.png" 
            alt="IPL Auction Simulator Dashboard displaying player stats, purse remaining, and active bidding wars" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Welcome to the ultimate <strong>IPL Auction Simulator</strong>, the most advanced, realistic, and exhilarating virtual auction experience available online. If you are a cricket fanatic, a fantasy sports enthusiast, or simply someone who loves the strategic depth of building a championship-winning team from scratch, you have found your new home. Our platform allows you to step directly into the shoes of a franchise owner, equipping you with a virtual purse, real-time player data, and the high-pressure environment of the auction table. Whether you want to simulate a mega auction to prepare for your fantasy league or just want to experience the thrill of bidding wars against your friends, our simulator provides an unparalleled level of authenticity.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Most Authentic Simulation Experience</h2>
          <p>
            What sets our IPL Auction Simulator apart is its unwavering commitment to realism. We do not just offer a random number generator; we provide a sophisticated engine that mirrors the complex dynamics of actual franchise auctions. When you start an auction room, you are greeted with a meticulously updated database of international superstars, rising domestic talents, and unsung heroes. Each player comes with distinct base prices, specialized roles, and detailed statistics that reflect their real-world form. The bidding mechanics are governed by dynamic timers and incremental algorithms that accurately simulate the escalating tension of a live auction. You will have to make split-second decisions: do you aggressively pursue a marquee all-rounder, or do you wait and build a balanced core with cost-effective utility players?
          </p>

          <p>
            Furthermore, the simulator is built to handle multiplayer competition seamlessly. You can invite up to 9 other friends to join your private room, each taking command of a different franchise. As the auctioneer (controlled by our automated system) brings players under the hammer, you will see bids flashing across the screen in real-time. The psychological warfare is real—you can drive up the price of a player you know your friend wants, depleting their purse and securing a strategic advantage for the later rounds. Check out our <Link href="/live-ipl-auction" className="text-[#10B981] hover:underline">Live IPL Auction</Link> guide to learn more about hosting real-time events.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Mastering Your Purse and Strategy</h2>
          <p>
            Success in the IPL Auction Simulator is heavily reliant on purse management and squad composition strategy. You start with a predetermined budget, and every bid is a calculated risk. Overspending early on a massive superstar might leave you scrambling to fill crucial gaps in your playing XI with lower-tier players. Conversely, being too conservative might mean missing out on match-winners and ending up with a mediocre squad. Our platform forces you to navigate these financial constraints just like real franchise management teams.
          </p>

          <p>
            To aid in your strategic planning, the simulator features a live dashboard that constantly tracks your remaining purse, your current squad size, and the distribution of roles (batsmen, bowlers, all-rounders, and wicket-keepers) within your team. You can monitor the purses of your competitors, predicting when they might drop out of a bidding war. If you want to delve deeper into advanced tactics, we highly recommend reading our comprehensive <Link href="/ipl-auction-strategy" className="text-[#10B981] hover:underline">IPL Auction Strategy</Link> guide, which covers everything from value-based drafting to budget allocation techniques.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Seamless Integration with Team Building</h2>
          <p>
            The auction is only the first half of the battle. Once the gavel falls for the final time and the squads are finalized, the true test of your strategic acumen begins. Our simulator seamlessly transitions into a comprehensive team management interface. Here, you must take your newly acquired squad of 15-25 players and distill them into the perfect playing XI. This involves adhering to real-world rules, such as the maximum limit on overseas players.
          </p>
          
          <p>
            You will need to analyze your players' strengths, designate a captain (who might earn double points in fantasy formats) and a vice-captain, and ensure you have enough bowling options and a reliable wicket-keeper. If you are struggling with this phase, our dedicated <Link href="/ipl-team-builder" className="text-[#10B981] hover:underline">IPL Team Builder</Link> page provides extensive tips and tools on constructing a balanced and formidable lineup. The satisfaction of seeing a team you drafted from scratch come together into a cohesive unit is unmatched.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Accessible and Free for Everyone</h2>
          <p>
            We believe that the joy of fantasy cricket drafting should be accessible to all fans. That is why our platform is completely free to use. There are no hidden fees, no premium subscriptions required to unlock basic features, and no pay-to-win mechanics. You can create as many mock auctions as you desire, inviting different groups of friends or practicing solo against our intelligent bots. We are committed to fostering a vibrant community of cricket lovers who can come together, debate player valuations, and enjoy the competitive spirit of the game.
          </p>
          
          <p>
            If you are looking for a completely cost-free way to enjoy this experience, visit our <Link href="/free-ipl-mock-auction" className="text-[#10B981] hover:underline">Free IPL Mock Auction</Link> page, which details all the features available to you at no cost. You get the premium look, the real-time websocket performance, and the massive player database without spending a dime.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Why Choose Our Platform?</h2>
          <p>
            There are several reasons why our simulator stands head and shoulders above the competition:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Stunning User Interface:</strong> A dark-themed, modern, and highly responsive UI that looks beautiful on desktops, tablets, and mobile devices.</li>
            <li><strong>Lightning Fast Real-Time Updates:</strong> Powered by websockets, bids and player updates are instantaneous, creating a truly live auction environment.</li>
            <li><strong>Comprehensive Player Database:</strong> Regular updates to player pools, including base prices and recent performances.</li>
            <li><strong>Customizable Auction Rules:</strong> Tweak the starting purse, maximum squad size, and timer durations to fit your group's preferences.</li>
            <li><strong>Automated Gavel:</strong> No need for a human auctioneer; our automated system handles the countdowns and player assignments seamlessly.</li>
          </ul>

          <p>
            Whether you are a casual fan looking for an evening of fun with friends or a hardcore fantasy analyst preparing for the biggest draft of the year, our IPL Auction Simulator is the definitive tool for you. The tension of the countdown, the rush of outbidding a rival, the strategic satisfaction of a well-planned draft—it is all here, waiting for you.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Do I need to download any software to use the simulator?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                No, our IPL Auction Simulator is entirely web-based. You can access it directly through your modern web browser on a desktop, laptop, tablet, or smartphone without needing to install any external software or applications.
              </div>
            </details>
            
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                How many players can join a single auction room?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Our platform supports up to 10 participants per auction room. One person creates the room and becomes the host, and they can invite up to 9 friends via a unique, shareable link to join and bid against each other in real-time.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Can I customize the starting budget for the franchises?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Yes! When creating a new auction room, the host has the ability to customize various settings, including the total starting purse for each franchise. This allows you to simulate different types of scenarios, from mega auctions with massive budgets to mini-auctions with restricted funds.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Is the player database updated regularly?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Absolutely. We pride ourselves on maintaining an accurate and up-to-date player database. We regularly add new debutants, adjust base prices according to recent real-world trends, and update player roles and categorizations to ensure the simulation feels authentic.
              </div>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Ready to Take the Gavel?</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">Create your room, invite your friends, and experience the adrenaline rush of the most realistic IPL auction simulation available. It's time to build your dynasty.</p>
            <Link href="/create">
              <button className="px-10 py-5 bg-[#10B981] hover:bg-[#059669] hover:scale-105 active:scale-95 text-white font-bold rounded-xl transition-all duration-300 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                Create Auction Room Now
              </button>
            </Link>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Auction Simulator | Crexio",
        "description": "Experience the ultimate IPL Auction Simulator. Draft players, manage your virtual purse, and test your franchise building skills against real opponents.",
        "url": "https://crexio-18.onrender.com/ipl-auction-simulator"
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
          "name": "IPL Auction Simulator",
          "item": "https://crexio-18.onrender.com/ipl-auction-simulator"
        }]
      }} />
    </main>
  );
}
