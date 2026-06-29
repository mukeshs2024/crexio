import Link from "next/link";
import { getRelatedPosts } from "@/lib/blog-data";

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedPosts(currentSlug, 3);
  
  if (!related || related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.05)]">
      <h2 className="text-2xl font-display font-black text-white mb-8 uppercase tracking-tight">Read More</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block p-6 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl hover:border-[#10B981] transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <div className="text-xs text-[#10B981] font-bold uppercase tracking-wider mb-3">
              {post.category}
            </div>
            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-sm text-[#B8C0D4] line-clamp-3 leading-relaxed">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
