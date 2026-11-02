import { SALON_INFO } from '../data/salonData';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAuditReport: () => void;
  onOpenManageBooking: () => void;
}

export function Footer({ onOpenBooking, onOpenAuditReport, onOpenManageBooking }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-editorial text-3xl text-white font-semibold tracking-tight">
              Thee Weave Snatcher
            </h3>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Elevating hair extension craftsmanship and healthy hair care in Grand Rapids, Michigan. Operated by licensed cosmetologist Ayanna Charelle.
            </p>
            <div className="text-xs text-amber-200/80 space-y-0.5">
              <p>{SALON_INFO.licenseStatus}</p>
              <p>Mane Attraction Salon · 865 28th St SE, Grand Rapids, MI 49508</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Ayanna Charelle</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services &amp; Pricing</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Hairstyle Portfolio</a>
              </li>
              <li>
                <a href="#policies" className="hover:text-white transition-colors">Salon Suite Policies</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Client Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Location &amp; Hours</a>
              </li>
            </ul>
          </div>

          {/* Independent Management */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Appointment &amp; Data Portal
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-900 text-xs font-medium rounded transition-colors text-center block"
              >
                Book An Appointment
              </button>
              <button
                onClick={onOpenManageBooking}
                className="w-full py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium rounded transition-colors text-center block"
              >
                Lookup or Reschedule Booking
              </button>
              <button
                onClick={onOpenAuditReport}
                className="w-full py-2 px-4 bg-stone-800/60 hover:bg-stone-700 text-stone-400 text-xs rounded transition-colors text-center block"
              >
                View StyleSeat Extraction Audit
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Thee Weave Snatcher · Bundled Beauty by Ayanna Charelle. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={SALON_INFO.sourceStyleSeatUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              Original StyleSeat Source Profile
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
