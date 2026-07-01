export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  image?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-ipl-mock-auctions-work",
    title: "How IPL Mock Auctions Work: A Complete Guide",
    description: "Discover the mechanics behind IPL mock auctions, from bidding rules to squad composition, and learn how to run your own successful draft.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Guides",
    tags: ["Basics", "Tutorial", "Mechanics"],
    author: "Crexio Team",
    readingTime: "5 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "complete-ipl-auction-strategy-guide",
    title: "The Complete IPL Auction Strategy Guide",
    description: "Master the draft with our comprehensive IPL Auction Strategy guide. Learn about purse management, player valuation, and outsmarting opponents.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Strategy",
    tags: ["Strategy", "Advanced", "Drafting"],
    author: "Crexio Team",
    readingTime: "8 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "ipl-auction-rules",
    title: "IPL Auction Rules Explained: What You Need to Know",
    description: "A detailed breakdown of all the official and standard mock IPL auction rules, including squad limits, overseas caps, and base prices.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Rules",
    tags: ["Rules", "Basics", "Squad"],
    author: "Crexio Team",
    readingTime: "6 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "ipl-auction-budget-guide",
    title: "The Ultimate IPL Auction Budget Management Guide",
    description: "Learn how to manage your purse effectively during an IPL auction. Tips on tiered spending, when to go big, and finding value picks.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Strategy",
    tags: ["Budget", "Purse", "Finance"],
    author: "Crexio Team",
    readingTime: "7 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "best-ipl-auction-strategy",
    title: "The Best IPL Auction Tactics and Strategies",
    description: "Explore the most successful auction tactics used by top fantasy managers, from price driving to bid sniping.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Strategy",
    tags: ["Tactics", "Advanced", "Competitive"],
    author: "Crexio Team",
    readingTime: "6 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "auction-analytics-explained",
    title: "AI Team Analytics Explained: Drafting Smarter",
    description: "Understand how AI and deep analytics can give you a massive edge in your next IPL mock auction by identifying undervalued players.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Analytics",
    tags: ["Analytics", "AI", "Data"],
    author: "Crexio Team",
    readingTime: "5 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "common-ipl-auction-mistakes",
    title: "Common IPL Mock Auction Mistakes to Avoid",
    description: "Don't ruin your draft early. Read about the most frequent and costly mistakes managers make during IPL mock auctions.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Tips",
    tags: ["Mistakes", "Tips", "Beginners"],
    author: "Crexio Team",
    readingTime: "5 min read",
    image: "/platform-screenshot.png"
  },
  {
    slug: "ipl-mega-auction-guide",
    title: "Preparing for an IPL Mega Auction: The Ultimate Guide",
    description: "Mega auctions require a completely different approach. Learn the nuances of building a core team from scratch in a mega auction format.",
    date: "2026-06-29",
    updatedAt: "2026-07-01",
    category: "Guides",
    tags: ["Mega Auction", "Long-term", "Strategy"],
    author: "Crexio Team",
    readingTime: "10 min read",
    image: "/platform-screenshot.png"
  }
];

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const currentPost = blogPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return blogPosts.slice(0, count);

  return blogPosts
    .filter(p => p.slug !== currentSlug)
    .sort((a, b) => {
      // Sort by matching category first, then matching tags
      let scoreA = a.category === currentPost.category ? 2 : 0;
      let scoreB = b.category === currentPost.category ? 2 : 0;
      
      scoreA += a.tags.filter(t => currentPost.tags.includes(t)).length;
      scoreB += b.tags.filter(t => currentPost.tags.includes(t)).length;

      return scoreB - scoreA;
    })
    .slice(0, count);
}
