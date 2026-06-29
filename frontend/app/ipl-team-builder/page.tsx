import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "IPL Team Builder - Assemble Your Perfect Playing XI",
  description: "Use our advanced IPL Team Builder to craft the ultimate playing XI. Balance overseas players, optimize roles, and select your captain with our drag-and-drop tool.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/ipl-team-builder",
  },
  openGraph: {
    title: "IPL Team Builder | Crexio",
    description: "Use our advanced IPL Team Builder to craft the ultimate playing XI. Balance overseas players, optimize roles, and select your captain.",
    url: "https://crexio-18.onrender.com/ipl-team-builder",
  }
};

export default function IplTeamBuilderPage() {
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
          IPL Team <span className="text-[#10B981]">Builder</span>
        </h1>

        <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl shadow-[rgba(16,185,129,0.1)]">
          <Image 
            src="/platform-screenshot.png" 
            alt="IPL Team Builder interface showing playing XI and bench" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Congratulations, the gavel has dropped, the auction has concluded, and you have successfully assembled a squad of talented cricketers using our <Link href="/ipl-auction-simulator" className="text-[#10B981] hover:underline">IPL Auction Simulator</Link>. But the job of a franchise manager is far from over. Now comes the most intellectually demanding part of the process: using the <strong>IPL Team Builder</strong> to distill your massive squad down to the perfect Playing XI. 
          </p>
          
          <p>
            Our dedicated team builder interface is designed to make this complex process intuitive, visual, and highly strategic. It is not just about picking your eleven most expensive players; it is about finding synergy, balancing roles, adhering to strict league regulations, and creating a cohesive unit capable of winning championships.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">The Art of Balancing Roles</h2>
          <p>
            The foundation of a strong T20 cricket team is balance. Our IPL Team Builder provides visual indicators and real-time warnings to ensure your lineup meets the necessary criteria. You cannot take the field without a designated wicket-keeper, and you certainly will not win matches without a potent bowling attack. 
          </p>
          
          <p>
            As you drag and drop players from your bench (the squad you drafted) into your active playing XI slots, the system automatically calculates your team's composition. It shows you the ratio of pure batsmen, all-rounders, pace bowlers, and spinners. A common strategy is to ensure you have at least six viable bowling options and batting depth down to number eight. Utilizing genuine all-rounders is the easiest way to achieve this flexibility, but they often come at a premium price during the auction phase.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Navigating the Overseas Player Limit</h2>
          <p>
            One of the most critical rules in franchise cricket is the restriction on overseas (international) players. You are typically allowed a maximum of four overseas players in your starting lineup. The IPL Team Builder strictly enforces this rule. If you attempt to slot a fifth overseas player into your XI, the system will flag the error, forcing you to reconsider your domestic talent.
          </p>
          
          <p>
            This limitation makes your auction strategy incredibly important. If you splurged your budget on five world-class international batsmen during the <Link href="/live-ipl-auction" className="text-[#10B981] hover:underline">Live IPL Auction</Link>, one of them is going to be sitting on the bench, wasting precious purse value. The Team Builder acts as a harsh but fair judge of your previous auction decisions, rewarding those who drafted a balanced core of domestic players.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Captains and Vice-Captains</h2>
          <p>
            In the realm of fantasy cricket, the players you designate as Captain and Vice-Captain are paramount. The Captain typically earns double points for their real-world performance, while the Vice-Captain earns 1.5x points. Selecting the right leaders can make or break your fantasy league season.
          </p>
          
          <p>
            The IPL Team Builder features simple toggle buttons to assign these crucial roles. We recommend choosing reliable performers who contribute in multiple facets of the game—such as top-order batsmen who also bowl a few overs. Relying entirely on a pure bowler as your captain is often a high-risk, high-reward strategy that requires careful consideration of the pitch conditions and opposition. For deeper insights into who makes a good captain, review our <Link href="/ipl-auction-strategy" className="text-[#10B981] hover:underline">IPL Auction Strategy</Link> guide.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Export and Share Your Masterpiece</h2>
          <p>
            Once you have meticulously crafted your perfect Playing XI, selected your captain, and ensured you meet all the team composition rules, it is time to show off your managerial brilliance. The IPL Team Builder allows you to generate a beautiful, shareable graphic of your final lineup.
          </p>

          <p>
            You can export this graphic and share it on social media, or send it directly to the group chat to intimidate the friends you just out-drafted. The graphic includes your franchise name, the player roles, and a clean visual representation of your batting order. Remember, you can experience all of this without spending a dime by utilizing our <Link href="/free-ipl-mock-auction" className="text-[#10B981] hover:underline">Free IPL Mock Auction</Link> platform.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Can I edit my playing XI after saving it?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Yes, you can return to the IPL Team Builder interface at any time to shuffle your batting order, swap benched players into the starting lineup, or change your Captain and Vice-Captain designations before the fantasy tournament officially locks.
              </div>
            </details>
            
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                What happens if I don't draft a wicket-keeper?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                A valid cricket team must have at least one designated wicket-keeper in the playing XI. If you fail to acquire one during the auction phase, the Team Builder will display a critical error, and your lineup will be considered incomplete or invalid.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Does the Team Builder track the "Impact Player" rule?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Yes, our advanced Team Builder supports modern franchise rules, including the designation of substitutes or "Impact Players," allowing you to formulate complex tactical strategies depending on whether you are batting or bowling first.
              </div>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Build Your Dream Team</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">Draft the best talent and use our intuitive Team Builder to craft an unbeatable starting XI. The championship trophy awaits.</p>
            <Link href="/create">
              <button className="px-10 py-5 bg-[#10B981] hover:bg-[#059669] hover:scale-105 active:scale-95 text-white font-bold rounded-xl transition-all duration-300 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                Start Building Now
              </button>
            </Link>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IPL Team Builder | Crexio",
        "description": "Use our advanced IPL Team Builder to craft the ultimate playing XI. Balance overseas players, optimize roles, and select your captain with our drag-and-drop tool.",
        "url": "https://crexio-18.onrender.com/ipl-team-builder"
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
          "name": "IPL Team Builder",
          "item": "https://crexio-18.onrender.com/ipl-team-builder"
        }]
      }} />
    </main>
  );
}
