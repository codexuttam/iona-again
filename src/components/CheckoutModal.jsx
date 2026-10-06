import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

export default function CheckoutModal({ reservationData, onClose }) {
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: 'UNITED STATES',
    paymentMethod: 'card'
  });

  if (!reservationData) return null;

  const reservationRef = `IONA-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05090C]/95 backdrop-blur-xl p-6 sm:p-12 flex items-center justify-center overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#081118] border border-white/20 p-8 sm:p-12 space-y-8 my-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <span className="text-[9px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                CONCIERGE CHECKOUT
              </span>
              <h3 className="font-syncopate text-2xl font-light text-white tracking-editorial uppercase">
                CONFIRM RESERVATION
              </h3>
            </div>

            {/* Order Summary Pill */}
            <div className="bg-[#05090C] border border-white/10 p-6 space-y-3">
              <div className="flex justify-between items-baseline text-xs tracking-editorial uppercase text-white font-medium">
                <span>{reservationData.edition.name} (x{reservationData.quantity})</span>
                <span>${reservationData.subtotal} USD</span>
              </div>
              {reservationData.engravingText && (
                <div className="text-[10px] tracking-ultra text-[#89B4D4] font-mono uppercase">
                  CUSTOM CAP ENGRAVING: "{reservationData.engravingText}"
                </div>
              )}
              {reservationData.isGift && (
                <div className="text-[10px] tracking-ultra text-white/70 uppercase">
                  + COMPLIMENTARY LUXURY GIFT WRAPPING INCLUDED
                </div>
              )}
            </div>

            {/* Customer Details Form */}
            <div className="space-y-4">
              <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
                SHIPPING CONCIERGE DETAILS
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="FULL NAME"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
                />
              </div>

              <input
                type="text"
                required
                placeholder="DESTINATION STREET ADDRESS"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="CITY / REGION"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="COUNTRY"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
                PAYMENT METHOD
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs tracking-editorial text-white uppercase">
                {['card', 'crypto', 'invoice'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`py-3 px-2 border transition-all text-center ${
                      formData.paymentMethod === method
                        ? 'bg-white text-black font-semibold border-white'
                        : 'bg-[#05090C] border-white/10 text-[#6C7A89] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {method === 'card' ? 'CREDIT CARD' : method === 'crypto' ? 'USDT / ETH' : 'INVOICE'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium text-xs tracking-ultra uppercase hover:bg-[#E8ECEF] transition-all flex items-center justify-center space-x-2 shadow-2xl"
            >
              <span>COMPLETE RESERVATION (${reservationData.subtotal} USD)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation Receipt */
          <div className="space-y-8 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#89B4D4]/10 border border-[#89B4D4] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-[#89B4D4]" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                RESERVATION CONFIRMED — REF: {reservationRef}
              </span>
              <h3 className="font-syncopate text-3xl font-light text-white tracking-editorial uppercase">
                WELCOME TO IONA
              </h3>
              <p className="text-xs tracking-editorial text-[#E8ECEF]/80 uppercase leading-relaxed max-w-md mx-auto font-light">
                Your decanter reservation has been registered with our source vault. A confirmation receipt has been dispatched to <strong className="text-white">{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-[#05090C] border border-white/10 p-6 text-left space-y-2 text-xs tracking-editorial text-white uppercase font-mono">
              <div className="flex justify-between">
                <span className="text-[#6C7A89]">DESTINATION:</span>
                <span>{formData.fullName}, {formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6C7A89]">ESTIMATED DISPATCH:</span>
                <span>3-5 BUSINESS DAYS</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-10 py-4 bg-white text-black font-medium text-xs tracking-ultra uppercase hover:bg-[#E8ECEF] transition-all"
            >
              RETURN TO CAMPAIGN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
