import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export default function ContactModal({ isOpen, onClose, initialSubject = '' }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || 'Case Allocation Reservation',
    quantity: '1 Case (12 Bottles)',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialSubject when opened
  React.useEffect(() => {
    if (isOpen && initialSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: initialSubject,
        message: initialSubject.includes('Reserve')
          ? `I would like to reserve a case of IONA (${initialSubject.replace('Reserve Case Allocation - ', '')}). Please confirm cellar batch availability and dispatch scheduling.`
          : prev.message,
      }));
    }
    if (!isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen, initialSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--theme-modal-backdrop)] backdrop-blur-2xl animate-in fade-in duration-300 pointer-events-auto"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[var(--theme-modal-bg)] border border-[var(--theme-modal-border)] p-6 sm:p-10 shadow-2xl text-[var(--theme-text-primary)] overflow-hidden">
        {/* Subtle Ambient Mist Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-text-accent)]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--theme-text-accent)]/10 border border-[var(--theme-text-accent)]/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-[var(--theme-text-accent)]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--theme-text-muted)] font-medium">
              MESSAGE RECEIVED
            </span>
            <h3 className="font-serif-luxury text-3xl font-light tracking-wide mt-2 text-[var(--theme-text-primary)]">
              Thank You
            </h3>
            <p className="mt-4 text-xs text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-sm">
              Thank you, <span className="text-[var(--theme-text-primary)] font-medium">{formData.name || 'valued guest'}</span>. Our team has received your message and will follow up directly at <span className="text-[var(--theme-text-primary)] font-medium">{formData.email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-sm"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--theme-text-muted)] mb-2 font-medium">
                CONTACT & INQUIRIES
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light tracking-tight text-[var(--theme-text-primary)]">
                Get in Touch
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] font-light mt-2 leading-relaxed">
                Orders, deliveries, retail inquiries, or questions about IONA.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="px-4 py-2.5 rounded-lg bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[var(--theme-text-accent)] focus:outline-none text-[var(--theme-text-primary)] font-sans text-xs transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    className="px-4 py-2.5 rounded-lg bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[var(--theme-text-accent)] focus:outline-none text-[var(--theme-text-primary)] font-sans text-xs transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-[var(--theme-text-muted)] uppercase tracking-wider font-medium">
                  Subject / Order Details
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order or Inquiry"
                  className="px-4 py-2.5 rounded-lg bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[var(--theme-text-accent)] focus:outline-none text-[var(--theme-text-primary)] font-sans text-xs transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-medium">
                  Message or Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide your delivery address or any questions..."
                  className="px-4 py-2.5 rounded-lg bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[var(--theme-text-accent)] focus:outline-none text-[var(--theme-text-primary)] font-sans text-xs resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--theme-text-muted)]">
                  <Shield className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
                  <span>Secure & Confidential</span>
                </div>

                <button
                  type="submit"
                  className="group flex items-center gap-2 px-7 py-2.5 rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] text-xs tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
