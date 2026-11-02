import { useState } from 'react';
import { Menu, X, CalendarCheck, FileSpreadsheet } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenManageBooking: () => void;
  onOpenAuditReport: () => void;
}

export function Navbar({ onOpenBooking, onOpenManageBooking, onOpenAuditReport }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display serif) */}
          <a
            href="#"
            className="font-editorial text-2xl md:text-3xl tracking-tight text-stone-900 font-semibold whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
          >
            Thee Weave Snatcher
          </a>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a href="#about" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              About
            </a>
            <a href="#services" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Services &amp; Pricing
            </a>
            <a href="#portfolio" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Portfolio
            </a>
            <a href="#policies" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Policies
            </a>
            <a href="#reviews" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Reviews
            </a>
            <a href="#contact" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Location
            </a>
            <button
              onClick={onOpenAuditReport}
              className="text-stone-500 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 text-xs bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded"
              title="View StyleSeat extraction documentation"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Extraction Data
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenManageBooking}
              className="text-xs font-medium text-stone-700 hover:text-stone-900 px-3 py-2 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4 text-stone-500" />
              Lookup Booking
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 text-sm font-medium tracking-wide text-white bg-stone-900 hover:bg-stone-800 active:scale-[0.98] transition-all rounded shadow-sm whitespace-nowrap shrink-0"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 rounded"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              About Ayanna
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Hairstyle Portfolio
            </a>
            <a
              href="#policies"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Salon Policies
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Client Testimonials
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Location &amp; Hours
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditReport();
              }}
              className="w-full text-left py-2 text-sm text-stone-600 hover:text-stone-900 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-stone-500" />
              StyleSeat Migration Audit Report
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManageBooking();
              }}
              className="w-full text-left py-2 text-sm text-stone-700 hover:text-stone-900 flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-stone-600" />
              Lookup or Reschedule Existing Appointment
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-3 text-sm font-medium text-white bg-stone-900 rounded"
            >
              Book New Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
