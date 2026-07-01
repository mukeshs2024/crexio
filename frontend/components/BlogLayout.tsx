import React from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import RelatedArticles from "./RelatedArticles";
import { BlogPost, blogPosts } from "@/lib/blog-data";

type BlogLayoutProps = {
  slug: string;
  children: React.ReactNode;
};

export default function BlogLayout({ slug, children }: BlogLayoutProps) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="text-white p-20">Post not found.</div>;
  }

    const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.updatedAt || post.date,
    "image": post.image ? `https://crexio-18.onrender.com${post.image}` : "https://crexio-18.onrender.com/platform-screenshot.png",
    "author": [{
      "@type": "Organization",
      "name": post.author,
      "url": "https://crexio-18.onrender.com"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Crexio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://crexio-18.onrender.com/trophy.png"
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#10B981] opacity-[0.03] blur-[150px]" />
      </div>

      <article className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/blog" className="text-[#10B981] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Blog
          </Link>
        </div>
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-bold uppercase tracking-wider rounded-full border border-[#10B981]/20">
              {post.category}
            </span>
            <span className="text-sm text-[#B8C0D4]">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            {post.updatedAt && (
              <span className="text-sm text-[#B8C0D4] italic">
                (Updated: {new Date(post.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })})
              </span>
            )}
            <span className="text-sm text-[#10B981] font-bold">
              • {post.readingTime}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6">
            {post.title}
          </h1>
          <Link href="/author/crexio-team" className="flex items-center gap-3 mb-6 border-b border-[rgba(255,255,255,0.05)] pb-6 hover:opacity-80 transition-opacity">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center font-bold text-white text-lg">
                C
             </div>
             <div>
                <p className="font-bold text-sm text-white hover:text-[#10B981] transition-colors">{post.author}</p>
                <p className="text-xs text-[#B8C0D4]">Editor at Crexio</p>
             </div>
          </Link>
          <p className="text-xl text-[#B8C0D4] leading-relaxed max-w-3xl">
            {post.description}
          </p>
          {post.image && (
            <div className="mt-8 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
              <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}
        </header>


        <div className="prose prose-invert prose-lg max-w-none prose-a:text-[#10B981] hover:prose-a:text-[#059669] prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-[#B8C0D4] prose-p:leading-relaxed prose-li:text-[#B8C0D4]">
          {children}
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 bg-gradient-to-br from-[#050505] to-[#0a1510] border border-[rgba(16,185,129,0.2)] rounded-3xl text-center shadow-2xl">
            <h3 className="text-4xl font-display font-black text-white mb-4 uppercase">Ready to Draft?</h3>
            <p className="text-[#B8C0D4] mb-8 text-lg max-w-2xl mx-auto">Put your knowledge to the test. Host a free mock auction and compete against your friends today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-xl transition-all tracking-widest uppercase">
                  Create Auction
                </button>
              </Link>
              <Link href="/join">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#10B981] hover:bg-[#10B981]/10 text-[#10B981] font-bold rounded-xl transition-all tracking-widest uppercase">
                  Join Auction
                </button>
              </Link>
            </div>
        </div>

        <RelatedArticles currentSlug={slug} />
      </article>

      <SEO schema={articleSchema} />
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
          "name": "Blog",
          "item": "https://crexio-18.onrender.com/blog"
        },{
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://crexio-18.onrender.com/blog/${post.slug}`
        }]
      }} />
    </main>
  );
}
