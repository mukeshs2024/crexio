import BlogLayout from "@/components/BlogLayout";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import Link from "next/link";

export default function IplAuctionRulesPost() {
  return (
    <BlogLayout slug="ipl-auction-rules">
      {/* Introduction */}
      <p>
        Whether you are a casual fan participating in your first fantasy draft or a seasoned manager looking to optimize your strategy, a thorough understanding of the <strong>IPL Auction Rules</strong> is absolutely mandatory. The rules govern every aspect of the auction, from how much money you can spend, to who you can buy, and how you can construct your final team. Ignorance of these rules will inevitably lead to a disqualified squad or a severely handicapped playing XI.
      </p>

      {/* Problem */}
      <h2>The Danger of Unstructured Bidding</h2>
      <p>
        Imagine spending hours analyzing player statistics, engaging in fierce bidding wars on our <Link href="/live-ipl-auction">Live IPL Auction</Link> platform, and successfully acquiring a star-studded lineup. You then move to the <Link href="/ipl-team-builder">IPL Team Builder</Link>, only to realize you purchased five overseas players for your starting lineup, or you forgot to draft a designated wicket-keeper. 
      </p>
      
      <p>
        These are common pitfalls that ruin mock auctions. The rules are not suggestions; they are hard constraints coded into the simulator to replicate the authentic franchise experience. If you do not plan your bidding around these constraints, your virtual purse will be wasted on players you cannot legally field.
      </p>

      {/* Explanation */}
      <h2>The Essential IPL Mock Auction Rules</h2>
      <p>
        While private mock auctions can be customized, standard simulations follow the official guidelines closely. Here are the core rules you must memorize:
      </p>
      
      <h3>1. The Purse Limit</h3>
      <p>
        Each franchise is allocated a fixed purse (e.g., 100 Crores in recent mega auctions). This is a hard cap. You cannot overspend. If a bid exceeds your remaining purse, the system will reject it. You must carefully monitor your remaining funds throughout the draft.
      </p>

      <h3>2. Squad Size Constraints</h3>
      <p>
        A franchise must build a squad of a minimum of 18 players and a maximum of 25 players. If the auction concludes and you have only purchased 16 players, your squad is invalid. You must budget enough money to fill at least the minimum squad size, even if it means buying base-price players at the end.
      </p>

      <h3>3. The Overseas Player Cap</h3>
      <p>
        This is arguably the most critical rule in team composition. Your overall squad can contain a maximum of 8 overseas (foreign) players. More importantly, your active Playing XI can feature a maximum of exactly 4 overseas players. 
      </p>

      <h3>4. The Right to Match (RTM) Card</h3>
      <p>
        In mega auctions, franchises are often given RTM cards. When a player who previously played for your franchise is sold to another team, you can exercise an RTM card to instantly match the final winning bid and reclaim the player. The number of RTM cards available depends on how many players you retained prior to the auction.
      </p>

      {/* Examples */}
      <h2>Applying the Rules in Real-Time</h2>
      <p>
        Let's look at an example regarding the overseas rule. You are deep into a <Link href="/free-ipl-mock-auction">Free IPL Mock Auction</Link>. You have already drafted four excellent overseas players: two openers, an all-rounder, and a fast bowler. 
      </p>
      
      <p>
        Later in the auction, a world-class overseas spinner is brought up. The price is surprisingly low. The temptation to bid is high. However, because you know the rules, you realize that if you buy this spinner, one of your expensive overseas players will be forced to sit on the bench every single match. Instead of wasting funds on a benched player, you let the spinner go and use that money to secure a top-tier domestic spinner who can legally slot into your starting XI.
      </p>

      {/* Screenshots */}
      <h2>Enforcing the Rules</h2>
      <div className="my-12 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
        <Image 
          src="/platform-screenshot.png" 
          alt="IPL Team Builder showing rule validation errors" 
          width={1200} 
          height={800} 
          className="w-full h-auto object-cover" 
        />
        <p className="text-center text-sm text-[#B8C0D4] mt-4 mb-4">Our platform automatically validates your team against all official rules, highlighting any violations.</p>
      </div>

      {/* Tips */}
      <h2>Tips for Rule Compliance</h2>
      <ul>
        <li><strong>Draft a Wicket-Keeper Early:</strong> A legal playing XI requires a wicket-keeper. Do not leave this to the last minute, or you will be forced to overpay for a sub-par player just to fulfill the rule.</li>
        <li><strong>Count Your Overseas Slots:</strong> Keep a physical tally or use our dashboard to constantly monitor how many overseas players you have acquired.</li>
        <li><strong>Save Money for the Minimum Roster:</strong> Always calculate `(Minimum Roster - Current Roster) * Base Price`. You must always have at least this much money in reserve.</li>
      </ul>

      {/* FAQ */}
      <FAQ items={[
        {
          question: "Can I change the rules for my private mock auction?",
          answer: "Yes. When you host a private room on our platform, you can customize the starting purse, the maximum squad size, and the overseas limits to suit your group's preferences."
        },
        {
          question: "What happens if I don't meet the minimum squad size of 18?",
          answer: "In a strict simulation, your franchise is penalized or disqualified. In standard fantasy mock drafts, the host will usually force you to fill the remaining slots with random unsold players at their base price."
        },
        {
          question: "Are Impact Players simulated?",
          answer: (
            <span>Yes, our advanced <Link href="/ipl-team-builder">IPL Team Builder</Link> includes mechanics for designating substitutes and Impact Players, adding another layer of strategic depth to the rules.</span>
          )
        }
      ]} />
    </BlogLayout>
  );
}
