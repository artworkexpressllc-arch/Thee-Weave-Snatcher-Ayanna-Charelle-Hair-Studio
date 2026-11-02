import { useState } from 'react';
import { SALON_INFO, BUSINESS_HOURS } from '../data/salonData';
import { MapPin, Phone, Mail, Instagram, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMessage('');
    }, 500);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
            <span>Salon Location &amp; Contact</span>
            <span aria-hidden="true">·</span>
            <span>Grand Rapids, MI</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
            Visit the Studio or Get in Touch.
          </h2>
          <p className="mt-3 text-stone-600 text-sm leading-relaxed">
            Conveniently located in Grand Rapids on 28th St SE within Mane Attraction Salon. Private, tranquil suite appointments reserved exclusively for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact details & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Salon Suite Card */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Studio Information
              </h3>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold">{SALON_INFO.streetAddress}</strong>
                    <span>{SALON_INFO.cityStateZip}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SALON_INFO.streetAddress}, ${SALON_INFO.cityStateZip}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-900 font-medium hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <Phone className="w-4 h-4 text-amber-900 shrink-0" />
                  <div>
                    <span className="text-stone-500 block text-[11px]">Direct Client Line:</span>
                    <a href={`tel:${SALON_INFO.phone}`} className="font-semibold text-stone-900 hover:underline">
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <Mail className="w-4 h-4 text-amber-900 shrink-0" />
                  <div>
                    <span className="text-stone-500 block text-[11px]">Inquiries:</span>
                    <a href={`mailto:${SALON_INFO.email}`} className="font-semibold text-stone-900 hover:underline">
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <Instagram className="w-4 h-4 text-amber-900 shrink-0" />
                  <div>
                    <span className="text-stone-500 block text-[11px]">Instagram Portfolios:</span>
                    <div className="flex items-center gap-3 font-semibold text-stone-900 mt-0.5">
                      <a href="https://instagram.com/OHSHEMAD" target="_blank" rel="noreferrer" className="hover:underline">
                        @OHSHEMAD
                      </a>
                      <span className="text-stone-300">·</span>
                      <a href="https://instagram.com/theeweavesnatcher" target="_blank" rel="noreferrer" className="hover:underline">
                        @theeweavesnatcher
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500" />
                <h3 className="font-editorial text-lg font-bold text-stone-900">
                  Operating Hours
                </h3>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {BUSINESS_HOURS.map((h, i) => (
                  <div key={i} className="py-2 flex items-center justify-between">
                    <span className={h.isOpen ? 'font-medium text-stone-900' : 'text-stone-400'}>
                      {h.day}
                    </span>
                    <span className={h.isOpen ? 'text-stone-700' : 'text-stone-400 italic'}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-xs">
              <h3 className="font-editorial text-2xl font-bold text-stone-900">
                Send a Question or Special Consultation Request
              </h3>
              <p className="text-xs text-stone-600 mt-1 mb-6">
                Have questions about hair bundles, lace closure customization, or wedding packages? Leave a message below and Ayanna will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-editorial text-xl font-bold text-stone-900">Message Received!</h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Thank you for reaching out. Ayanna Charelle has received your note and will reply via text or email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 text-xs text-amber-900 underline font-medium"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-800">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lauren Henderson"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-800">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. (616) 555-0123"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-800">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. lauren@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-800">Your Message or Consultation Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ask about hair types, custom coloring, scheduling VIP slots, or lace drop-offs..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="w-full sm:w-auto text-xs font-medium text-amber-900 hover:underline"
                    >
                      Or skip inquiry and book appointment directly →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
