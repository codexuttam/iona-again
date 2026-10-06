import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import BottleArchitecture from './components/BottleArchitecture';
import IonizationProcess from './components/IonizationProcess';
import PurityIndex from './components/PurityIndex';
import ReservationDrawer from './components/ReservationDrawer';
import CheckoutModal from './components/CheckoutModal';
import AudioAtmosphere from './components/AudioAtmosphere';
import Footer from './components/Footer';

export default function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const handleOpenReserve = () => {
    setReserveOpen(true);
  };

  const handleCloseReserve = () => {
    setReserveOpen(false);
  };

  const handleProceedCheckout = (data) => {
    setReserveOpen(false);
    setCheckoutData(data);
  };

  const handleCloseCheckout = () => {
    setCheckoutData(null);
  };

  return (
    <div className="min-h-screen bg-[#05090C] text-[#E8ECEF] selection:bg-[#111820] selection:text-white relative">
      {/* Audio Atmosphere Ambient Synth Toggle */}
      <AudioAtmosphere />

      {/* Minimal Header Navbar */}
      <Navbar onOpenReserve={handleOpenReserve} />

      {/* Main Content */}
      <main>
        <Hero onOpenReserve={handleOpenReserve} />

        {/* Visual Campaign Mosaic Grid (Motifs 01 - 08) */}
        <CampaignGrid />

        {/* Bottle Architecture & Facet Lighting Explorer */}
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
