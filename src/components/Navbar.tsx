import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenReserve: () => void;
}

export default function Navbar({ onOpenReserve }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled
          ? 'bg-[#05090C]/90 backdrop-blur-md py-4 border-b border-white/10'
          : 'bg-transparent py-7 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Monolithic Editorial Logo */}
        <a href="#" className="flex items-center group shrink-0">
          <span className="font-editorial text-lg md:text-xl font-light tracking-[0.45em] text-white/90 hover:text-white transition-opacity">
            I O N A
          </span>
        </a>

        {/* Minimal Editorial Nav Links */}
        <nav className="hidden md:flex items-center gap-12 xl:gap-16 text-[10px] tracking-[0.4em] font-light text-white/60 uppercase">
          <a
            href="#campaign"
            className="hover:text-white transition-colors py-1 relative hover:opacity-100 opacity-80"
          >
            CAMPAIGN
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors py-1 relative hover:opacity-100 opacity-80"
          >
            ARCHITECTURE
          </a>
          <a
            href="#ionization"
            className="hover:text-white transition-colors py-1 relative hover:opacity-100 opacity-80"
          >
            IONIZATION
          </a>
          <a
            href="#matrix"
            className="hover:text-white transition-colors py-1 relative hover:opacity-100 opacity-80"
          >
            MATRIX
          </a>
        </nav>

        {/* Minimal Luxury Reserve Action */}
        <div className="hidden sm:flex items-center shrink-0">
          <button
            onClick={onOpenReserve}
            className="text-[10px] tracking-[0.4em] font-light text-white/80 hover:text-white uppercase transition-all py-1.5 px-3 border-b border-white/20 hover:border-white/80 cursor-pointer"
          >
            RESERVE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/70 hover:text-white p-2"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#05090C] border-b border-white/10 px-8 py-10 space-y-6 text-xs tracking-[0.35em] text-[#E8ECEF] uppercase">
          <a
            href="#campaign"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-white/5 hover:text-white"
          >
            CAMPAIGN MOSAIC
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-white/5 hover:text-white"
          >
            BOTTLE ARCHITECTURE (3D)
          </a>
          <a
            href="#purification"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-white/5 hover:text-white"
          >
            IONIZATION PROCESS
          </a>
          <a
            href="#minerals"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-white/5 hover:text-white"
          >
            MINERAL MATRIX
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReserve();
            }}
            className="w-full mt-4 py-3 bg-white text-black font-semibold text-center tracking-[0.35em]"
          >
            RESERVE DECANTER
          </button>
        </div>
      )}
    </header>
  );
}
