import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "Free IPL Mock Auction - Play Fantasy Cricket Without Cost",
  description: "Join the best Free IPL Mock Auction platform online. Host multiplayer auction rooms, bid on top players, and build your ultimate team with zero hidden fees.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/free-ipl-mock-auction",
  },
  openGraph: {
    title: "Free IPL Mock Auction | Crexio",
    description: "Join the best Free IPL Mock Auction platform online. Host multiplayer auction rooms, bid on top players, and build your ultimate team.",
    url: "https://crexio-18.onrender.com/free-ipl-mock-auction",
  }
};

export default function FreeIplMockAuctionPage() {
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
          Free IPL <span className="text-[#10B981]">Mock Auction</span>
        </h1>

        <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl shadow-[rgba(16,185,129,0.1)]">
          <Image 
            src="/platform-screenshot.png" 
            alt="Free IPL Mock Auction platform dashboard" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-[#B8C0D4]">
          <p>
            Are you searching for a high-quality, comprehensive, and absolutely <strong>Free IPL Mock Auction</strong> platform? Look no further. At Crexio, we firmly believe that the thrill of team building, strategic bidding, and fantasy sports should not come with a price tag. We have built the ultimate simulation experience that rivals premium, paid platforms, but we have made it accessible to every cricket fan around the globe, completely free of charge. No credit cards, no hidden paywalls, and no annoying restrictions on core gameplay loops.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Premium Experience, Zero Cost</h2>
          <p>
            Often, when you hear the word "free" in the context of online gaming or simulators, you expect compromises. You might anticipate clunky user interfaces, outdated player databases, or intrusive advertisements that ruin the immersive experience. Our platform shatters those expectations. We provide a sleek, modern, dark-themed dashboard that feels like a professional sports management tool. From the moment you log in and create your first room, you will notice the smooth animations, the responsive design, and the instantaneous feedback from our backend servers.
          </p>

          <p>
            Our core mission is to provide an inclusive space for the fantasy cricket community. Whether you are a group of college students running a casual weekend tournament or a dedicated league of seasoned fantasy veterans doing their pre-season draft, our Free IPL Mock Auction simulator has all the tools you need. Check out our <Link href="/ipl-auction-simulator" className="text-[#10B981] hover:underline">IPL Auction Simulator</Link> deep dive to learn about the incredible technology that powers this free experience.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">What Do You Get for Free?</h2>
          <p>
            We do not lock the best parts of the simulator behind a subscription. When you use our platform, you instantly gain access to:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Unlimited Auction Rooms:</strong> Create as many private or public rooms as you want. There are no daily limits on how many times you can play.</li>
            <li><strong>Full Multiplayer Functionality:</strong> Invite up to 9 other friends to join your room for real-time competitive bidding.</li>
            <li><strong>Complete Player Database:</strong> Access thousands of players, including current international stars, domestic prospects, and legends, complete with accurate base prices and categorizations.</li>
            <li><strong>Advanced Team Builder:</strong> After the auction concludes, use our drag-and-drop interface to assemble your final Playing XI without any restrictions.</li>
            <li><strong>Live Websocket Updates:</strong> Enjoy lag-free bidding wars with real-time countdown timers synchronized across all devices.</li>
          </ul>

          <p>
            By offering all these features for free, we encourage users to experiment. You can run multiple simulations with different strategies. Try one auction where you spend heavily on elite batsmen, and another where you focus purely on a world-class bowling attack. To improve your tactics, read our <Link href="/ipl-auction-strategy" className="text-[#10B981] hover:underline">IPL Auction Strategy</Link> guide, which will help you dominate your friends regardless of your budget constraints.
          </p>

          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">No Pay-To-Win Mechanics</h2>
          <p>
            In many online games, spending real money can buy you an unfair advantage over other players. Our Free IPL Mock Auction platform is strictly built on the principles of fair play and equal opportunity. When you enter an auction room, the only things that determine your success are your cricket knowledge, your bidding nerve, and your strategic planning. You cannot buy extra virtual purse money, you cannot pay to extend the bidding timer, and you cannot unlock "premium" players that are hidden from others. Every franchise starts on a level playing field.
          </p>
          
          <h2 className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight">Community Driven Development</h2>
          <p>
            Because we do not rely on a subscription model, our growth is fueled entirely by community engagement and word-of-mouth. We listen closely to our users' feedback to continuously improve the platform. If the community suggests a new feature—like customized purse limits, specialized player pools, or new tie-breaker rules—we work hard to implement those updates quickly. We want this to be the definitive hub for fantasy cricket enthusiasts. 
          </p>
          
          <p>
            If you want to experience the fast-paced action of these multiplayer events, you can learn more on our <Link href="/live-ipl-auction" className="text-[#10B981] hover:underline">Live IPL Auction</Link> page. Gather your friends, share the room link, and find out who has the best management skills.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Is the platform truly 100% free?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                Yes. There are no registration fees, no monthly subscriptions, and no hidden micro-transactions. All core features necessary to host and participate in a mock auction are available to everyone for free.
              </div>
            </details>
            
            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Do I have to create an account to play?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                While having an account can help save your historical auction data and statistics, it is not strictly mandatory for guests to join a room. However, creating an account is also completely free and takes just a few seconds.
              </div>
            </details>

            <details className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
              <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
                Will there be ads during the auction?
                <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
                We know that timing and focus are critical during a live bidding war. Therefore, our active auction interface is designed to be clean and completely free of intrusive video or pop-up advertisements that could disrupt your experience.
              </div>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Play for Free Now</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">No credit cards, no commitments. Just pure, unadulterated fantasy cricket excitement. Start your free mock auction today.</p>
            <Link href="/create">
              <button className="px-10 py-5 bg-[#10B981] hover:bg-[#059669] hover:scale-105 active:scale-95 text-white font-bold rounded-xl transition-all duration-300 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                Create Free Auction
              </button>
            </Link>
        </div>
      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free IPL Mock Auction | Crexio",
        "description": "Join the best Free IPL Mock Auction platform online. Host multiplayer auction rooms, bid on top players, and build your ultimate team with zero hidden fees.",
        "url": "https://crexio-18.onrender.com/free-ipl-mock-auction"
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
          "name": "Free IPL Mock Auction",
          "item": "https://crexio-18.onrender.com/free-ipl-mock-auction"
        }]
      }} />
    </main>
  );
}
