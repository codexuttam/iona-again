import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import IonaHeroVisual from './components/iona/IonaHeroVisual';
import ReservationDrawer from './components/ReservationDrawer';
import CheckoutModal from './components/CheckoutModal';
import { useLenis } from './animation/useLenis';

export default function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  // Initialize Lenis smooth scroll
  useLenis();

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
    <ThemeProvider>
      <div className="min-h-screen bg-[#03070A] text-[#E8ECEF] selection:bg-[#7DEAF0] selection:text-black relative overflow-x-hidden font-sans">
        {/* Editorial Luxury Header Navigation */}
        <Navbar onOpenReserve={handleOpenReserve} />

        {/* Master Rebuilt IONA Cinematic Hero Visual */}
        <main className="relative z-10 w-full">
          <IonaHeroVisual onOpenReserve={handleOpenReserve} />
        </main>

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
    </ThemeProvider>
  );
}
