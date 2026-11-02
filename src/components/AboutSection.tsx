import { SALON_INFO } from '../data/salonData';
import { Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
            <span>Meet The Stylist</span>
            <span aria-hidden="true">·</span>
            <span>Ayanna Charelle</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
            Crafting confidence, one seamless stitch and silky press at a time.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Stylist Portrait & Experience Badge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/5] bg-stone-100">
              <img
                src="/src/assets/images/portfolio_silk_press_1793587466771.jpg"
                alt="Ayanna Charelle hair artistry showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <p className="font-editorial text-2xl font-medium">Ayanna Charelle</p>
                <p className="text-xs text-amber-200 mt-0.5">Licensed Cosmetologist &amp; Extensionist</p>
                <p className="text-xs text-stone-300 mt-1">Grand Rapids, Michigan</p>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-4">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Michigan State Board Licensed</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Licensed Cosmetologist since 2013 with formal sanitation &amp; trichology training.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Heart className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Health-First Philosophy</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Focusing on scalp nutrition, zero-traction braid patterns, and preserving fragile edges.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-base">
            
            <div className="p-6 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <p className="font-editorial text-xl italic text-amber-950 leading-relaxed">
                “Your hair is your crown, your confidence, and your glory. My greatest joy is meeting amazing clients and creating transformative, head-turning looks that make you feel radiant from the inside out.”
              </p>
              <p className="text-xs font-semibold text-amber-900 mt-3 uppercase tracking-wider">
                — Ayanna Charelle, Founder &amp; Master Stylist
              </p>
            </div>

            <p>
              Ayanna Charelle began her professional hairstyling journey in 2009, driven by an innate artistry for hair transformations and weave architecture. In 2013, she achieved her official Cosmetology licensure from the State of Michigan, solidifying her commitment to professional excellence, scalp hygiene, and precision cutting techniques.
            </p>

            <p>
              Widely celebrated across Grand Rapids and West Michigan under the brand <strong className="text-stone-900 font-semibold">Thee Weave Snatcher</strong> (and <strong className="text-stone-900 font-semibold">Bundled Beauty</strong>), Ayanna operates out of a comfortable, upscale private suite within Mane Attraction Salon on 28th St SE.
            </p>

            <h3 className="font-editorial text-2xl text-stone-900 pt-2">
              The Thee Weave Snatcher Difference
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Flat, Tension-Free Braid Foundations
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  Engineered braid patterns tailored to your head shape and style for an undetectable, lump-free silhouette with zero pain or pulling.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Protective Cap Barrier Quick Weaves
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  Specialized double-cap barrier shield ensuring absolutely zero bonding adhesive touches your natural hair or scalp.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Thermal Reversion Silk Presses
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  Infusing deep ultrasonic steam moisture and heat defense so your natural curls bounce back undamaged after washing.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Punctual &amp; Respectful Scheduling
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  No all-day salon waiting rooms. Your appointment time is dedicated solely to you in a tranquil, professional suite.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Reserve an Appointment with Ayanna
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
