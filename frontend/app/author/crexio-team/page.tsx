import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Crexio Team - Author Profile",
  description: "Learn about the Crexio Team, the experts behind India's premier IPL Mock Auction Simulator.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/author/crexio-team",
  }
};

export default function AuthorPage() {
  const authorPosts = blogPosts.filter(post => post.author === "Crexio Team");

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#10B981] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/blog" className="text-[#10B981] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Blog
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-16 pb-12 border-b border-[rgba(255,255,255,0.05)]">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center font-bold text-white text-5xl shrink-0">
            C
          </div>
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 leading-[0.9] tracking-tight uppercase">
              Crexio <span className="text-[#10B981]">Team</span>
            </h1>
            <p className="text-xl text-[#B8C0D4] mb-4">
              Data Scientists, Fantasy Sports Analysts & Software Engineers
            </p>
            <div className="prose prose-invert prose-lg max-w-none text-[#B8C0D4]">
              <p>
                The Crexio Team is a collective of die-hard cricket enthusiasts and technical experts. We specialize in analyzing IPL mega auction strategies, retention mechanics, and player valuations. By combining real-world cricketing intelligence with cutting-edge web sockets, we have built the ultimate simulation experience.
              </p>
              <p>
                When we are not running our own high-stakes fantasy leagues, we are writing guides to help you dominate yours. 
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-tight">Articles by Crexio Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authorPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 hover:border-[#10B981]/50 transition-all h-full flex flex-col">
                <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#B8C0D4] text-sm line-clamp-3 mb-4 flex-grow">
                  {post.description}
                </p>
                <div className="text-xs text-[#6B7280] font-medium mt-auto">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} • {post.readingTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Crexio Team",
        "url": "https://crexio-18.onrender.com/author/crexio-team",
        "jobTitle": "Fantasy Sports Analysts",
        "worksFor": {
          "@type": "Organization",
          "name": "Crexio"
        },
        "knowsAbout": ["Cricket Analytics", "Fantasy Sports Drafting", "IPL Auction Strategy"]
      }} />
    </main>
  );
}
