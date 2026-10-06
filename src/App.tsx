import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import BottleArchitecture from './components/BottleArchitecture';
import IonizationProcess from './components/IonizationProcess';
import PurityIndex from './components/PurityIndex';
import ReservationDrawer from './components/ReservationDrawer';
import CheckoutModal from './components/CheckoutModal';
import AudioAtmosphere from './components/AudioAtmosphere';
import ThreeBackgroundCanvas from './components/ThreeBackgroundCanvas';
import Footer from './components/Footer';

export default function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  const handleOpenReserve = () => {
    setReserveOpen(true);
  };

  const handleCloseReserve = () => {
    setReserveOpen(false);
  };

  const handleProceedCheckout = (data: any) => {
    setReserveOpen(false);
    setCheckoutData(data);
  };

  const handleCloseCheckout = () => {
    setCheckoutData(null);
  };

  return (
    <div className="min-h-screen bg-[#05090C] text-[#E8ECEF] selection:bg-[#111820] selection:text-white relative overflow-x-hidden">
      {/* 3D Ambient WebGL Atmosphere (Dynamic 3D water wave & floating bubbles) */}
      <ThreeBackgroundCanvas />

      {/* Dynamic Cursor Light Caustic Spot */}
      <div
        className="fixed pointer-events-none z-0 rounded-full blur-[110px] transition-transform duration-75 ease-out"
        style={{
          width: '500px',
          height: '500px',
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: 'radial-gradient(circle, rgba(125, 234, 240, 0.09) 0%, rgba(32, 191, 211, 0.04) 45%, transparent 70%)',
        }}
      />

      {/* Audio Atmosphere Ambient Synth Toggle */}
      <AudioAtmosphere />

      {/* Minimal Header Navbar */}
      <Navbar onOpenReserve={handleOpenReserve} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Panoramic Mountains & Master Bottle Hero */}
        <Hero onOpenReserve={handleOpenReserve} />

        {/* Visual Campaign Mosaic Grid (Motifs 01 - 08) */}
        <CampaignGrid />

        {/* 3D Bottle Architecture & Real-Time Three.js WebGL Facet Explorer */}
        <BottleArchitecture />

        {/* Ionization & Purification Protocol */}
        <IonizationProcess />

        {/* Mineral Matrix Specifications & Certifications */}
        <PurityIndex />
      </main>

      {/* Footer */}
      <Footer onOpenReserve={handleOpenReserve} />

      {/* Reservation Drawer Customizer */}
      <ReservationDrawer
        isOpen={reserveOpen}
        onClose={handleCloseReserve}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout Concierge Modal & Receipt */}
      {checkoutData && (
        <CheckoutModal
          reservationData={checkoutData}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
}
