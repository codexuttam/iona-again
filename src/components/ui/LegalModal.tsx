import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
  onSwitchType: (type: 'terms' | 'privacy') => void;
}

export default function LegalModal({ isOpen, type, onClose, onSwitchType }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const isTerms = type === 'terms';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--theme-modal-backdrop)] backdrop-blur-2xl animate-in fade-in duration-300 pointer-events-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[var(--theme-modal-bg)] border border-[var(--theme-modal-border)] p-6 sm:p-8 shadow-2xl text-[var(--theme-text-primary)] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border-subtle)] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSwitchType('terms')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                isTerms
                  ? 'bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] font-medium shadow-sm'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-pill-bg)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>TERMS OF SERVICE</span>
            </button>
            <button
              onClick={() => onSwitchType('privacy')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                !isTerms
                  ? 'bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] font-medium shadow-sm'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-pill-bg)]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PRIVACY CHARTER</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 mt-6 space-y-6 text-xs text-[var(--theme-text-secondary)] leading-relaxed font-sans scrollbar-thin">
          {isTerms ? (
            <>
              <div>
                <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase tracking-widest block mb-1">
                  EFFECTIVE DATE: OCTOBER 2026
                </span>
                <h3 className="font-display text-2xl font-bold uppercase italic text-[var(--theme-text-primary)]">
                  TERMS OF SERVICE & ORDERS
                </h3>
                <p className="mt-2 text-[var(--theme-text-secondary)]">
                  Welcome to IONA. By accessing this platform, ordering cases, or interacting with our digital flagship, you agree to comply with and be bound by the following Terms & Conditions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                  1. ORDERS & RESERVATIONS
                </h4>
                <p>
                  All case orders placed with IONA are processed subject to batch vintage availability and release clearance. Receipt of an order confirmation will be verified by our team prior to dispatch.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                  2. HERMETIC PURITY & BATCH TESTING
                </h4>
                <p>
                  Each batch of IONA undergoes third-party laser spectroscopy and micro-batch certification guaranteeing minimum 8.5+ electrolytic pH balance and 0.001 micron filtration. Reports are archived and accessible to allocation holders upon delivery.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                  3. INTELLECTUAL PROPERTY & 3D ASSETS
                </h4>
                <p>
                  All visuals, 3D WebGL assets, typography, custom shaders, and branding present on this application are the exclusive intellectual property of IONA Beverages Inc.  replication or extraction of 3D geometry is strictly prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                  4. TEMPERATURE SENSITIVE DISPATCH
                </h4>
                <p>
                  IONA bottles are transported via climate-regulated courier to maintain crystalline molecular structure and mineral equilibrium. Delivery timelines will be coordinated directly through our support team.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase tracking-widest block mb-1">
                  EFFECTIVE DATE: OCTOBER 2026
                </span>
                <h3 className="font-display text-2xl font-bold uppercase italic text-[var(--theme-text-primary)]">
                  PRIVACY & DATA GOVERNANCE POLICY
                </h3>
                <p className="mt-2 text-[var(--theme-text-secondary)]">
                  IONA is dedicated to safeguarding the privacy and digital sovereignty of our patrons. This document outlines how client inquiries and allocation data are managed with the highest encryption standards.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                  1. INFORMATION WE COLLECT
                </h4>
                <p>
                  We collect strictly necessary order information provided voluntarily when you request case allocations, including patron name, delivery jurisdiction, contact email, and special batch handling notes.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-accent)]">
                  2. ZERO THIRD-PARTY AD TRACKING
                </h4>
                <p>
                  IONA operates zero third-party advertisement networks, behavioral ad trackers, or data broker integrations. Your digital interactions remain isolated to our luxury experience.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-accent)]">
                  3. ENCRYPTION & RETENTION
                </h4>
                <p>
                  All allocation transmission records utilize end-to-end 256-bit TLS encryption. Records of dispatched batches are retained strictly for warranty authentication and recurring cellar replenishment schedules.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-accent)]">
                  4. CLIENT RIGHTS & DATA PURGING
                </h4>
                <p>
                  Patrons maintain full discretion to request complete erasure of their inquiry history and contact details at any moment by contacting our privacy compliance desk.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-[var(--theme-border-subtle)] flex items-center justify-between text-xs text-[var(--theme-text-muted)] shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
            <span>GDPR & CCPA Compliant Governance</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
