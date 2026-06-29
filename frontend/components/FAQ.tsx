import React from 'react';

export type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

export default function FAQ({ items }: { items: FAQItemProps[] }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mt-16 mb-16">
      <h2 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <details key={idx} className="group bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(16,185,129,0.3)] transition-all">
            <summary className="w-full p-6 text-left font-bold text-white text-lg cursor-pointer flex justify-between items-center list-none outline-none">
              {item.question}
              <span className="text-[#10B981] text-2xl transition-transform duration-300 group-open:rotate-180">↓</span>
            </summary>
            <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
