import { SALON_INFO } from '../data/salonData';
import { ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export function Hero({ onOpenBooking, onExploreServices }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-900">
              <span>Grand Rapids, Michigan</span>
              <span aria-hidden="true">·</span>
              <span>Master Extensionist</span>
              <span aria-hidden="true">·</span>
              <span>Licensed Cosmetologist</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight text-balance">
              Where Precision Meets Healthy Hair Mastery.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Experience the private salon suite of <strong className="font-semibold text-stone-900">Ayanna Charelle</strong>. Renowned for seamless sew-in weaves, razor-sharp quick weave bobs, and weightless diamond-gloss silk presses designed to protect your edges and stimulate natural hair growth.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium tracking-wide rounded shadow-sm hover:shadow active:scale-[0.99] transition-all"
              >
                Book Your Appointment
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-medium rounded transition-colors"
              >
                View Services &amp; Pricing
              </button>
            </div>

            {/* Trust & Proof Adjacency */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-semibold text-stone-900">4.9 / 5.0</span>
                <span className="text-stone-400">·</span>
                <span>Verified StyleSeat Reviews</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>MI Licensed Cosmetologist (Since 2013)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-200 aspect-[4/5]">
              <img
                src="/src/assets/images/hero_hairstylist_salon_1793587466461.jpg"
                alt="Ayanna Charelle Salon Suite interior at Mane Attraction Salon"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <div className="flex items-center gap-2 text-xs tracking-wide uppercase text-amber-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Thee Weave Snatcher Studio</span>
                </div>
                <p className="font-editorial text-2xl font-normal leading-snug">
                  Mane Attraction Salon · Suite Residence
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  865 28th St SE, Grand Rapids, MI
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Item Proof Bar */}
      <div className="bg-stone-900 text-stone-200 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <p className="font-editorial text-2xl text-amber-200 font-semibold tabular-nums">15+ Years</p>
              <p className="text-xs text-stone-400 mt-0.5">Professional Styling Experience</p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-amber-200 font-semibold tabular-nums">0% Tension</p>
              <p className="text-xs text-stone-400 mt-0.5">Edge-Protective Braid Foundation</p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-amber-200 font-semibold tabular-nums">100%</p>
              <p className="text-xs text-stone-400 mt-0.5">Virgin Hair &amp; Scalp Care Focus</p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-amber-200 font-semibold tabular-nums">$0 Deposit</p>
              <p className="text-xs text-stone-400 mt-0.5">Pay In Person Upon Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
