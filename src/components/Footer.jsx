import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

export default function Footer({ onOpenReserve }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030508] text-[#E8ECEF] py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Top Subtle Refraction Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block">
              <span className="font-syncopate text-3xl font-light tracking-ultra text-white">
                I O N A
              </span>
            </a>
            <p className="text-xs tracking-editorial text-[#6C7A89] uppercase leading-relaxed max-w-sm font-light">
              Ultra-pure ionized glacial water, housed in faceted crystal glass and forged in black basalt stone.
            </p>
            <div className="text-[10px] tracking-ultra text-[#89B4D4] font-mono uppercase">
              COORDINATES: 64°08'N 21°56'W — ICELANDIC BASALT VAULT
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
              NAVIGATION
            </span>
            <ul className="space-y-3 text-xs tracking-editorial uppercase text-[#E8ECEF]/80">
              <li>
                <a href="#campaign" className="hover:text-white transition-colors">VISUAL CAMPAIGN MOSAIC</a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">BOTTLE ARCHITECTURE</a>
              </li>
              <li>
                <a href="#purification" className="hover:text-white transition-colors">IONIZATION PROTOCOL</a>
              </li>
              <li>
                <a href="#minerals" className="hover:text-white transition-colors">MINERAL MATRIX SPECS</a>
              </li>
            </ul>
          </div>

          {/* Private Dispatch Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
              PRIVATE CAMPAIGN DISPATCH
            </span>
            <p className="text-xs tracking-editorial text-[#6C7A89] uppercase leading-relaxed font-light">
              Subscribe to receive private allocations of limited-edition crystal decanters and source updates.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="ENTER EMAIL ADDRESS"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#081118] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-white text-black font-semibold text-xs tracking-ultra uppercase hover:bg-[#E8ECEF] transition-all shrink-0"
                >
                  JOIN
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-2 text-xs tracking-editorial text-[#89B4D4] uppercase font-mono bg-[#081118] p-3 border border-white/10">
                <Check className="w-4 h-4 text-[#89B4D4]" />
                <span>DISPATCH SUBSCRIPTION CONFIRMED</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-ultra text-[#6C7A89] uppercase gap-4">
          <div>
            © 2026 IONA WATER COMPANY. ALL RIGHTS RESERVED. FORGED IN BASALT.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
