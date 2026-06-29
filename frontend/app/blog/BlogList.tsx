"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost, blogPosts } from "@/lib/blog-data";

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="w-full md:w-1/2">
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#10B981] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? "bg-[#10B981] text-white" 
                  : "bg-[#050505] text-[#B8C0D4] border border-[rgba(255,255,255,0.1)] hover:border-[#10B981]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-[#B8C0D4]">
          No articles found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-8 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl hover:border-[#10B981] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-bold uppercase tracking-wider rounded-full border border-[#10B981]/20">
                  {post.category}
                </span>
                <span className="text-xs text-[#B8C0D4]">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#10B981] transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-[#B8C0D4] leading-relaxed flex-grow">
                {post.description}
              </p>
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)] flex items-center text-[#10B981] font-bold text-sm tracking-widest uppercase">
                Read Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
