import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenReserve }) {
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <span className="font-syncopate text-xl md:text-2xl font-light tracking-ultra text-white group-hover:text-[#89B4D4] transition-colors">
            I O N A
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10 text-[11px] tracking-ultra text-[#E8ECEF]/80 uppercase">
          <a href="#campaign" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
            CAMPAIGN
          </a>
          <a href="#architecture" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
            ARCHITECTURE
          </a>
          <a href="#purification" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
            IONIZATION
          </a>
          <a href="#minerals" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
            MATRIX
          </a>
        </nav>

        {/* Right action button */}
        <div className="hidden sm:flex items-center space-x-6">
          <button
            onClick={onOpenReserve}
            className="flex items-center space-x-2.5 px-5 py-2.5 bg-transparent border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all text-[11px] tracking-ultra text-white uppercase"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#89B4D4]" />
            <span>RESERVE</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#05090C] border-b border-white/10 px-8 py-10 space-y-6 text-xs tracking-ultra text-[#E8ECEF] uppercase">
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
            BOTTLE ARCHITECTURE
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
            className="w-full mt-4 py-3 bg-white text-black font-semibold text-center tracking-ultra"
          >
            RESERVE DECANTER
          </button>
        </div>
      )}
    </header>
  );
}
