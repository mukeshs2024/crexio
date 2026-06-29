import { Metadata } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "IPL Mock Auction Blog - Strategy, Tips & News",
  description: "Read the latest articles on IPL mock auction strategies, purse management, rules, and analytics to dominate your fantasy leagues.",
  alternates: {
    canonical: "https://crexio-18.onrender.com/blog",
  },
  openGraph: {
    title: "IPL Mock Auction Blog | Crexio",
    description: "Read the latest articles on IPL mock auction strategies, purse management, rules, and analytics.",
    url: "https://crexio-18.onrender.com/blog",
  }
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#000000] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#10B981] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#10B981] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>

        <header className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tight uppercase">
            The <span className="text-[#10B981]">Crexio</span> Blog
          </h1>
          <p className="text-xl text-[#B8C0D4] max-w-2xl leading-relaxed">
            Master the art of the draft with our comprehensive guides, deep-dive analytics, and proven strategies for IPL mock auctions.
          </p>
        </header>

        <BlogList />

      </div>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "IPL Mock Auction Blog | Crexio",
        "description": "Read the latest articles on IPL mock auction strategies, purse management, rules, and analytics to dominate your fantasy leagues.",
        "url": "https://crexio-18.onrender.com/blog"
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
          "name": "Blog",
          "item": "https://crexio-18.onrender.com/blog"
        }]
      }} />
    </main>
  );
}
