import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Shield, Gift, ShoppingBag } from 'lucide-react';

const EDITIONS = [
  {
    id: 'single',
    name: 'SINGLE EDITORIAL DECANTER',
    volume: '750 ML / 25.3 FL OZ',
    price: 45,
    desc: 'One hand-inspected faceted crystal decanter with brushed silver cap.',
    delivery: 'Ships in custom foam-lined rigid black box.'
  },
  {
    id: 'quad',
    name: 'QUAD COLLECTOR CHEST',
    volume: '4 X 750 ML / 101.2 FL OZ',
    price: 160,
    desc: 'Four decanters housed in a matte black velvet-lined campaign collector case.',
    delivery: 'Complimentary expedited cold-chain shipping.'
  },
  {
    id: 'reserve',
    name: 'PERPETUAL GLACIER RESERVE',
    volume: '8 X 750 ML MONTHLY SUBSCRIPTION',
    price: 290,
    desc: 'Bi-weekly delivery directly from source reserves. Concierge priority batching.',
    delivery: 'Bi-weekly recurring delivery. Cancel anytime.'
  }
];

export default function ReservationDrawer({ isOpen, onClose, onProceedCheckout }) {
  const [selectedEdition, setSelectedEdition] = useState(EDITIONS[1]);
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [isGift, setIsGift] = useState(false);

  if (!isOpen) return null;

  const subtotal = selectedEdition.price * quantity + (engravingText ? 15 : 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    onProceedCheckout({
      edition: selectedEdition,
      quantity,
      engravingText,
      isGift,
      subtotal
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#05090C]/90 backdrop-blur-md"
        />

        {/* Slide Drawer */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-[#081118] border-l border-white/10 flex flex-col justify-between shadow-2xl relative z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                  ACQUISITION DRAWER
                </span>
                <h3 className="font-syncopate text-xl font-light text-white tracking-editorial uppercase">
                  RESERVE IONA
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Form Content */}
            <form onSubmit={handleCheckoutSubmit} className="p-8 space-y-8 flex-1">
              {/* Edition Selection */}
              <div className="space-y-4">
                <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
                  01 / SELECT EDITION
                </span>
                <div className="space-y-3">
                  {EDITIONS.map((ed) => (
                    <div
                      key={ed.id}
                      onClick={() => setSelectedEdition(ed)}
                      className={`p-5 border cursor-pointer transition-all space-y-2 ${
                        selectedEdition.id === ed.id
                          ? 'bg-[#0D1820] border-white text-white'
                          : 'bg-transparent border-white/10 text-[#6C7A89] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="font-syncopate text-xs tracking-editorial uppercase text-white">
                          {ed.name}
                        </span>
                        <span className="font-syncopate text-sm font-light text-white">
                          ${ed.price} USD
                        </span>
                      </div>
                      <div className="text-[9px] tracking-ultra text-[#89B4D4] uppercase font-mono">
                        {ed.volume}
                      </div>
                      <p className="text-[11px] tracking-editorial text-[#E8ECEF]/80 uppercase leading-relaxed font-light">
                        {ed.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cap Engraving Option */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block font-mono">
                    02 / CUSTOM CAP ENGRAVING (+$15 USD)
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  placeholder="E.G. I O N A  2 0 2 6"
                  className="w-full px-4 py-3 bg-[#05090C] border border-white/10 focus:border-white text-white text-xs tracking-ultra uppercase placeholder:text-[#6C7A89] outline-none transition-colors font-mono"
                />
                <p className="text-[10px] tracking-editorial text-[#6C7A89] uppercase">
                  Precision laser-etched onto the top brushed silver titanium cap. Max 12 characters.
                </p>
              </div>

              {/* Gift Packaging Option */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <Gift className="w-4 h-4 text-[#89B4D4]" />
                  <span className="text-xs tracking-editorial text-white uppercase">
                    COMPLIMENTARY LUXURY GIFT WRAPPING
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGift(!isGift)}
                  className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                    isGift ? 'bg-white text-black border-white' : 'border-white/20'
                  }`}
                >
                  {isGift && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase font-mono">
                  03 / QUANTITY
                </span>
                <div className="flex items-center space-x-4 bg-[#05090C] border border-white/10 px-4 py-1.5 text-xs text-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-[#89B4D4] px-2 text-lg"
                  >
                    -
                  </button>
                  <span className="font-mono">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-[#89B4D4] px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>

            {/* Footer Checkout Action */}
            <div className="p-8 border-t border-white/10 space-y-4 bg-[#05090C]">
              <div className="flex justify-between items-baseline text-xs tracking-editorial text-white uppercase">
                <span>TOTAL ACQUISITION COST</span>
                <span className="font-syncopate text-xl font-light text-[#89B4D4]">
                  ${subtotal} USD
                </span>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                className="w-full py-4 bg-white text-black font-medium text-xs tracking-ultra uppercase hover:bg-[#E8ECEF] transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>PROCEED TO CONCIERGE CHECKOUT</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[9px] tracking-ultra text-[#6C7A89] uppercase font-mono pt-2">
                <Shield className="w-3 h-3 text-[#89B4D4]" />
                <span>256-BIT ENCRYPTED LUXURY RESERVATION</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
