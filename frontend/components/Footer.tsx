import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.05)] bg-[#050505] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-2">
          <h3 className="font-black text-white mb-4 text-xl tracking-widest uppercase">CREXIO</h3>
          <p className="text-[#B8C0D4] leading-relaxed mb-6">The premier mock auction platform for cricket enthusiasts. Build, bid, and dominate.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[#B8C0D4] hover:text-[#0066FF] transition-colors">Twitter</a>
            <a href="#" className="text-[#B8C0D4] hover:text-[#0066FF] transition-colors">GitHub</a>
            <a href="#" className="text-[#B8C0D4] hover:text-[#0066FF] transition-colors">LinkedIn</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Simulators</h3>
          <ul className="space-y-2 text-[#B8C0D4]">
            <li><Link href="/ipl-mock-auction" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Mock Auction</Link></li>
            <li><Link href="/ipl-auction-simulator" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Auction Simulator</Link></li>
            <li><Link href="/ipl-mega-auction" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Mega Auction</Link></li>
            <li><Link href="/fantasy-auction" className="block py-2 hover:text-[#0066FF] transition-colors">Fantasy Auction</Link></li>
            <li><Link href="/cricket-mock-auction" className="block py-2 hover:text-[#0066FF] transition-colors">Cricket Mock Auction</Link></li>
            <li><Link href="/mock-ipl-auction" className="block py-2 hover:text-[#0066FF] transition-colors">Mock IPL Auction</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Features & Tools</h3>
          <ul className="space-y-2 text-[#B8C0D4]">
            <li><Link href="/ipl-auction-game" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Auction Game</Link></li>
            <li><Link href="/ipl-team-builder" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Team Builder</Link></li>
            <li><Link href="/auction-analytics" className="block py-2 hover:text-[#0066FF] transition-colors">Auction Analytics</Link></li>
            <li><Link href="/live-ipl-auction" className="block py-2 hover:text-[#0066FF] transition-colors">Live IPL Auction</Link></li>
            <li><Link href="/free-ipl-mock-auction" className="block py-2 hover:text-[#0066FF] transition-colors">Free IPL Mock Auction</Link></li>
            <li><Link href="/ipl-auction-strategy" className="block py-2 hover:text-[#0066FF] transition-colors">IPL Auction Strategy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Company</h3>
          <ul className="space-y-2 text-[#B8C0D4]">
            <li><Link href="/about" className="block py-2 hover:text-[#0066FF] transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="block py-2 hover:text-[#0066FF] transition-colors">Blog</Link></li>
            <li><Link href="/privacy-policy" className="block py-2 hover:text-[#0066FF] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="block py-2 hover:text-[#0066FF] transition-colors">Terms of Service</Link></li>
            <li><a href="mailto:vprlks20@gmail.com" className="block py-2 hover:text-[#0066FF] transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] text-center text-[#B8C0D4] text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Crexio. All rights reserved.</p>
        <p className="opacity-50">Not affiliated with the BCCI or IPL.</p>
      </div>
    </footer>
  );
}
